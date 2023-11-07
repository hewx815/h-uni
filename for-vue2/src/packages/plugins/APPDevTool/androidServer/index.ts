import { resolve } from 'path';

import type { Argvs } from '../index.js';
import type { DeviceOptions } from './choiceDevice.js';

import { getConfig, initTemplate, getResourcePath } from '../common/index.js';
import { err, checkPathExists, log } from '../utils.js';
import { DEFAULT_APPLICATION_ID } from './constant.js';

import buildApk from './buildAPK.js';
import choiceDevice from './choiceDevice.js';
import constructorProject from './constructorProject.js';
import installApk from './installAPK.js';
import startApp from './startApp.js';
import listenServer from './listenServer.js';
import getJavaPath from './getJavaPath.js';

let device: DeviceOptions | null = null;
let running: boolean = false;
let listenning: boolean = false;

export default async function androidServer(argvs: Argvs) {
  running = true;

  const { config: userConfig, path: configPath } = await getConfig(typeof argvs.config === 'string' ? argvs.config : undefined);

  const androidSdkPath = userConfig.android?.androidSdkPath;

  if (androidSdkPath) process.env.ANDROID_SDK_ROOT = androidSdkPath;

  const { path: javaPath, version, description } = getJavaPath({ config: userConfig, path: configPath });

  process.env.JAVA_HOME = javaPath;

  log(`当前使用的 java ：

  版本：${version}
  路径：${javaPath}
  来自于：${description}`, 'android');

  const root = argvs.root === 'string' ? argvs.root : process.cwd();

  if (!process.env.ANDROID_SDK_ROOT) return err('未发现 Android SDK 路径', '', 'android');

  if (!process.env.JAVA_HOME) return err('未发现 JAVA 路径', '', 'android');

  let projectPath = '';

  if (typeof argvs.project === 'string') {
    if (checkPathExists(argvs.project)) {
      projectPath = resolve(argvs.project, './android');
    } else {
      err('devPath 参数指定的路径不存在', '', 'android');
    }
  } else {
    const defaultProjectPath = resolve(root, './node_modules/.h-uni/android');

    projectPath = defaultProjectPath;

    if (!checkPathExists(defaultProjectPath)) {
      initTemplate(projectPath, 'android');
    }
  }

  const resourceDir = getResourcePath(userConfig);

  const abdPath = resolve(process.env.ANDROID_SDK_ROOT, './platform-tools');

  const apkPath = resolve(projectPath, './simpleDemo/build/outputs/apk/debug/simpleDemo-debug.apk');

  await constructorProject(
    root,
    projectPath,
    resourceDir,
    {
      appID: userConfig.appID,
      appKey: userConfig.android?.appKey,
      applicationId: userConfig.android?.applicationId,
      versionCode: userConfig.android?.versionCode,
      versionName: userConfig.android?.versionName,
      signing: userConfig.android?.signing,
    },
  );

  try {
    await buildApk(projectPath);
  } catch (code) {
    err('构建 APK 失败', '', 'android');
  }

  if (!device) {
    device = await choiceDevice(abdPath);
  }

  await installApk(device.deviceName, apkPath, abdPath);

  await startApp(
    device.deviceName,
    userConfig.android?.applicationId || DEFAULT_APPLICATION_ID,
    abdPath,
  );

  if (!listenning) {
    listenServer(projectPath, configPath, resourceDir, () => {
      if (!running) {
        listenning = false;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        androidServer(argvs);
      }
    });
  }
  running = false;

  return true;
}
