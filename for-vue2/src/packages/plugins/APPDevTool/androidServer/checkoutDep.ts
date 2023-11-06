/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { spawnSync } from 'child_process';
import path from 'path';
import { readdir } from 'fs/promises';
import inquirer from 'inquirer8';
import AdmZip from 'adm-zip';
import {
  checkPathExists, err, log, downloadFile,
} from '../utils.js';
import {
  JAVA_V, COMPILE_SDK_V, BUIILD_TOOLS_V, COMMAND_SDKMANAGER, COMMANDLINETOOLS_WIN_URL,
} from './constant.js';

export default async function checkoutDep() {
  function checkoutJavaVersion() {
    const { stderr: stdout, error } = spawnSync(
      './java',
      ['-version'],
      {
        cwd: path.resolve(process.env.JAVA_HOME as string, './bin'),
        encoding: 'utf-8',
      },
    );

    if (error) {
      err(`获取 java 版本出错：${process.env.JAVA_HOME}`, error, 'android');
    }

    const str = stdout.split('\r\n')[0];

    if (str.indexOf('openjdk version') !== 0 && str.indexOf('java version') !== 0) {
      err(`获取 java 版本出错，未知字符串：${str}`, null, 'android');
    }

    const version = str.split(' ')[2].replace(/"/g, '').split('.');

    let versionStr = '';

    if (Number(version[0]) > 10) {
      versionStr = `JavaVersion.VERSION_${version[0]}`;
    }

    if (Number(version[0]) > 25) {
      versionStr = 'JavaVersion.VERSION_HIGHER';
    }

    versionStr = `JavaVersion.VERSION_${version[0]}_${version[1]}`;

    if (versionStr !== JAVA_V) {
      err(`java 版本不兼容

  要求版本：${JAVA_V}
  当前版本：${versionStr}
  使用的java目录：${process.env.JAVA_HOME}
  `, null, 'android');
    }
  }

  async function main() {
    function getToolPath() {
      const oldToolsPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './tools/bin');
      const newToolsPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './cmdline-tools/bin');

      if (checkPathExists(oldToolsPath)) return oldToolsPath;
      if (checkPathExists(newToolsPath)) return newToolsPath;
      return '';
    }

    if (checkPathExists(process.env.ANDROID_SDK_ROOT as string)) {
      const buildToolsPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './build-tools');
      const platformsPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './platforms');

      const buildToolsVersions = await readdir(buildToolsPath);
      const platformsVersions = await readdir(platformsPath);

      const installList = [];
      if (!buildToolsVersions.includes(BUIILD_TOOLS_V)) {
        installList.push(`"build-tools;${BUIILD_TOOLS_V}"`);
      }

      if (!platformsVersions.includes(`android-${COMPILE_SDK_V}`)) {
        installList.push(`"platforms;android-${COMPILE_SDK_V}"`);
      }

      if (installList.length !== 0) {
        // eslint-disable-next-line no-console
        console.clear();
        log(`检查到本机 Android Sdk 缺少下方工具：

  ${installList.join('\n  ')}`, 'android');

        const res: { confirm: boolean; } = await inquirer.prompt({
          type: 'confirm',
          name: 'confirm',
          message: '是否自动安装？',
        });

        if (res.confirm) {
          let toolsPath = getToolPath();

          if (!toolsPath) {
            log('正在安装 Android Sdk 命令行工具', 'android');
            const zipPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './cmdline-tools.zip');

            await downloadFile(COMMANDLINETOOLS_WIN_URL, zipPath);

            const zip = new AdmZip(zipPath);
            zip.extractAllTo(process.env.ANDROID_SDK_ROOT as string, true);

            toolsPath = path.resolve(process.env.ANDROID_SDK_ROOT as string, './cmdline-tools/bin');
          }

          const { error } = spawnSync(COMMAND_SDKMANAGER, [...installList], {
            cwd: toolsPath, shell: true, stdio: 'inherit', encoding: 'utf-8',
          });

          if (error) {
            err(`安装 android Sdk 构建工具 出错：${process.env.ANDROID_SDK_ROOT}`, error, 'android');
          } else {
            log(`检查到本机 Android Sdk 缺少下方工具：
          ${String(installList)}
            `, 'android');
          }
        }
      }
    }
  }

  checkoutJavaVersion();

  try {
    await main();
  } catch (e) {
    err(`效验 android Sdk 构建工具 出错：${process.env.ANDROID_SDK_ROOT}`, e, 'android');
  }
}
