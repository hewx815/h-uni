/* eslint-disable no-await-in-loop */
import AdmZip from 'adm-zip';
import inquirer from 'inquirer8';

import type { Config } from 'config.js';
import { spawnSync } from 'child_process';
import { resolve, dirname } from 'path';
import { userInfo } from 'os';
import { readdir, mkdir } from 'fs/promises';

import {
  checkPathExists, downloadFile, err, log, deleteFolderContents,
} from '../utils.js';
import {
  COMMAND_SDKMANAGER, BUIILD_TOOLS_V, COMPILE_SDK_V, COMMANDLINETOOLS_WIN_URL,
} from './constant.js';

export default async function getSdkPath(
  root: string,
  config?: { config: Config, path: string; },
) {
  function checkoutCmdlineTool(_path: string): string | false {
    const oldPath = resolve(_path, './tools/bin');
    const newPath = resolve(_path, './cmdline-tools/bin');
    let path = '';

    if (checkPathExists(oldPath)) {
      path = oldPath;
    } else if (checkPathExists(newPath)) {
      path = newPath;
    } else {
      return false;
    }

    const { error, stderr, stdout } = spawnSync(
      COMMAND_SDKMANAGER,
      ['--version', `--sdk_root=${_path}`],
      { cwd: path, shell: true, encoding: 'utf-8' },
    );
    if (stderr) return false;

    if (error) return false;

    if (stdout) return path;

    return false;
  }

  async function createSdkDir(path: string) {
    if (checkPathExists(path)) {
      await deleteFolderContents(path);
    }

    await mkdir(path, { recursive: true });

    const zipPath = resolve(root, './node_modules/.h-uni/cache/cmdline-tools.zip');

    if (!checkPathExists(dirname(zipPath))) {
      await mkdir(dirname(zipPath), { recursive: true });
    }

    if (process.platform === 'win32') {
      try {
        await downloadFile(COMMANDLINETOOLS_WIN_URL, zipPath);
      } catch (e) {
        err(`下载命令行工具失败，请手动下载命令行工具，解压到：${path}`, e, 'android');
      }
    } else {
      err(`暂不支持自动创建sdk目录，请手动下载解压到：${path}`, '', 'android');
    }

    const zip = new AdmZip(zipPath);

    zip.extractAllTo(path, true);

    await Promise.resolve();
  }

  async function checkoutTools(sdkPath: string): Promise<string[]> {
    const buildToolsPath = resolve(sdkPath, './build-tools');
    const platformsPath = resolve(sdkPath, './platforms');
    const platformToolsPath = resolve(sdkPath, './platform-tools');

    const buildToolsVersions = checkPathExists(buildToolsPath) ? await readdir(buildToolsPath) : [];
    const platformsVersions = checkPathExists(platformsPath) ? await readdir(platformsPath) : [];

    const installList = [];

    if (!buildToolsVersions.includes(BUIILD_TOOLS_V)) {
      installList.push(`"build-tools;${BUIILD_TOOLS_V}"`);
    }

    if (!platformsVersions.includes(`android-${COMPILE_SDK_V}`)) {
      installList.push(`"platforms;android-${COMPILE_SDK_V}"`);
    }

    if (!checkPathExists(platformToolsPath)) {
      installList.push('"platform-tools"');
    }

    return installList;
  }

  function installTools(tools: string[], sdkPath: string, sdkManagerPath: string) {
    log(`开始安装缺少的 android Sdk 构建工具：${tools.join(' ')}`, 'android');

    const { error } = spawnSync(
      COMMAND_SDKMANAGER,
      [`--sdk_root=${sdkPath}`, ...tools],
      {
        cwd: sdkManagerPath, shell: true, stdio: 'inherit', encoding: 'utf-8',
      },
    );

    if (error) {
      return err(`安装 android Sdk 构建工具 出错：${sdkPath}`, error, 'android');
    }

    return tools;
  }

  async function main() {
    const hUniSdkPath = resolve(root, './node_modules/.h-uni/android_sdk');

    const paths = [
      // config
      {
        path: config?.config.android?.androidSdkPath,
        description: `配置文件：${config?.config.android?.androidSdkPath} android.androidSdkPath`,
      },
      // h-uni
      {
        path: hUniSdkPath,
        description: 'h-uni',
      },
      // env ANDROID_SDK_ROOT
      {
        path: process.env.ANDROID_SDK_ROOT,
        description: '环境变量 ANDROID_SDK_ROOT',
      },
      // default
      {
        path: process.platform === 'win32'
          ? resolve(userInfo().homedir, './AppData/Local/Android/Sdk')
          : resolve(userInfo().homedir, './Library/Android/sdk'),
        description: '默认路径',
      },
    ];

    for (let index = 0; index < paths.length; index += 1) {
      const pathItem = paths[index];

      if (pathItem.path && checkPathExists(pathItem.path)) {
        const sdkManagerPath = checkoutCmdlineTool(pathItem.path);

        if (sdkManagerPath) {
          const tools = await checkoutTools(pathItem.path);

          if (tools.length === 0) {
            return pathItem as {
              path: string,
              description: string,
            };
          }

          installTools(tools, pathItem.path, sdkManagerPath);

          return pathItem as {
            path: string,
            description: string,
          };
        }
      }
    }

    log('未找到有效的 Android Sdk 路径', 'android');

    const res: { confirm: boolean; } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `是否通过 h-uni 创建并初始化 sdk 目录：${hUniSdkPath}？`,
    });

    if (res.confirm) {
      await createSdkDir(hUniSdkPath);
      const tools = await checkoutTools(hUniSdkPath);

      if (tools.length === 0) {
        return {
          path: hUniSdkPath,
          description: 'h-uni',
        };
      }

      installTools(tools, hUniSdkPath, resolve(hUniSdkPath, './tools/bin'));

      return {
        path: hUniSdkPath,
        description: 'h-uni',
      };
    }

    err('请配置有效的 Android Sdk 路径，并重试', '', 'android');

    return {
      path: '',
      description: '',
    };
  }

  const res = await main();
  return res;
}
