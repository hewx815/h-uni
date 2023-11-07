import type { Config } from 'config.js';
import { spawnSync } from 'child_process';
import { resolve, join } from 'path';
import { userInfo } from 'os';
import { readdir } from 'fs/promises';
import { checkPathExists, err } from '../utils.js';
import { COMMAND_SDKMANAGER, BUIILD_TOOLS_V, COMPILE_SDK_V } from './constant.js';

// 按指定顺序获取sdk路径，效验是否有效(有命令行工具)，效验下载指定版本，如果没有有效的路径，可选择自动初始化sdk路径下载指定版本，反之报错退出
export default async function getSdkPath(config?: { config: Config, path: string; }) {
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

  function createSdkDir(path) {

  }

  async function checkoutTools(sdkPath: string) {
    const buildToolsPath = resolve(sdkPath, './build-tools');
    const platformsPath = resolve(sdkPath, './platforms');

    const buildToolsVersions = checkPathExists(buildToolsPath) ? await readdir(buildToolsPath) : [];
    const platformsVersions = checkPathExists(platformsPath) ? await readdir(platformsPath) : [];

    const installList = [];

    if (!buildToolsVersions.includes(BUIILD_TOOLS_V)) {
      installList.push(`"build-tools;${BUIILD_TOOLS_V}"`);
    }

    if (!platformsVersions.includes(`android-${COMPILE_SDK_V}`)) {
      installList.push(`"platforms;android-${COMPILE_SDK_V}"`);
    }

    return installList;
  }

  function installTools(tools: string[], sdkPath: string, sdkManagerPath: string) {
    const { error } = spawnSync(
      COMMAND_SDKMANAGER,
      [`--sdk_root=${sdkPath}`, ...tools],
      {
        cwd: sdkManagerPath, shell: true, stdio: 'inherit', encoding: 'utf-8',
      },
    );
  }

  async function main() {
    // config
    const configPath = config?.config.android?.androidSdkPath;
    if (configPath && checkPathExists(configPath)) {
      const sdkManagerPath = checkoutCmdlineTool(configPath);
      if (sdkManagerPath) {
        const tools = await checkoutTools(configPath);
        if (tools.length === 0) {
          return configPath;
        }
        installTools(tools, configPath, sdkManagerPath);
      }
    }

    const defaultSdkPath = process.platform === 'win32'
      ? resolve(userInfo().homedir, 'AppData/Local/Android/Sdk')
      : resolve(userInfo().homedir, 'Library/Android/sdk');

    if (checkPathExists(defaultSdkPath)) {
      const sdkPath = checkoutCmdlineTool('C:\\Users\\qianx\\Desktop\\SDK');
    }
    // const sdkPath = checkoutCmdlineTool('C:\\Users\\qianx\\Desktop\\SDK');
    // if (!sdkPath) {

    // }
    // const dd = await checkoutTools(sdkPath);
    // console.log(sdkPath);
  }
  await main();
}
process.env.JAVA_HOME = 'C:\\Program Files\\Eclipse Adoptium\\jdk-8.0.392.8-hotspot';

getSdkPath();
