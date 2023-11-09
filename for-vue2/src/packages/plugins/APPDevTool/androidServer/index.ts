import { resolve } from 'path';

import type { Argvs } from '../index.js';
import type { DeviceOptions } from './choiceDevice.js';

import { getConfig, initTemplate, getResourcePath } from '../common/index.js';
import { LISTEN_SERVER_HELP_TEXT, DEFAULT_APPLICATION_ID } from './constant.js';
import {
  err, log,
} from '../utils.js';

import buildApk from './buildAPK.js';
import choiceDevice from './choiceDevice.js';
import constructorProject from './constructorProject.js';
import installApk from './installAPK.js';
import startApp from './startApp.js';
import listenServer from './listenServer.js';
import getJavaPath from './getJavaPath.js';
import getSdkPath from './getSdkPath.js';

let device: DeviceOptions | null = null;
let running: boolean = false;

export default async function androidServer(argvs: Argvs) {
  running = true;

  const { config: userConfig, path: configPath } = await getConfig(typeof argvs.config === 'string' ? argvs.config : undefined);

  const root = argvs.root === 'string' ? argvs.root : process.cwd();

  const { path: androidSdkPath, description: androidSdkDes } = await getSdkPath(root, { config: userConfig, path: configPath });

  process.env.ANDROID_SDK_ROOT = androidSdkPath;

  log(`当前使用的 Android SDK ：
  路径：${androidSdkPath}
  来自于：${androidSdkDes}`, 'android');

  const { path: javaPath, version, description: javaDes } = getJavaPath({ config: userConfig, path: configPath });

  process.env.JAVA_HOME = javaPath;

  log(`当前使用的 java ：

  版本：${version}
  路径：${javaPath}
  来自于：${javaDes}`, 'android');

  const projectPath = typeof argvs.project === 'string' ? resolve(root, argvs.project, './android') : resolve(root, './node_modules/.h-uni/android');

  await initTemplate(projectPath, 'android');

  const resourceDir = resolve(configPath, '../', getResourcePath(userConfig));

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

  listenServer(projectPath, configPath, resourceDir, async () => {
    if (!running) {
      await androidServer(argvs);
    }
  });

  // eslint-disable-next-line no-console
  console.clear();

  log(`服务已启用...

  ${LISTEN_SERVER_HELP_TEXT}`);

  running = false;

  return true;
}
