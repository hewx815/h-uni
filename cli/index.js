import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
import {
  choiceDevConfig,
  choiceDevFolder,
  getScriptsList,
  choiceScript,
  runStart,
  copyPackages,
  delDir,
  checkoutDir,
} from './utils.js';
import { setStorageSync, getStorageSync } from './storage/index.js';

const lastModeKey = 'USER_LAST_MODE';

/**
 * @name startDev
 * @description 启动开发服务
 * @param {*}
 * @return {Promise}
*/
export const startDev = async () => {
  try {
    let config;
    const configList = ['选择新配置'];
    const lastMode = await getStorageSync(lastModeKey);
    if (lastMode) {
      configList.unshift(`使用上一次的配置:${JSON.stringify(lastMode)}`);
    }
    const configUser = await choiceDevConfig(configList);
    if (configUser === '选择新配置') {
      const devFolder = await choiceDevFolder(['for-vue2', 'for-vue3']);
      const scriptsList = await getScriptsList(devFolder);
      const script = await choiceScript(scriptsList);
      await setStorageSync(lastModeKey, { devFolder, script });
      config = { devFolder, script };
    } else {
      config = lastMode;
    }
    // eslint-disable-next-line no-console
    console.log(`
>当前配置 ${JSON.stringify(config)}
>下次运行可直接使用此配置
`);
    runStart(config.devFolder, config.script);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('cli: error');
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

/**
 * @name startBuild
 * @description 启动打包服务
 * @param {*}
 * @return {*}
*/
export const startBuild = async () => {
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
  const getPath = (pathd) => path.resolve(CurrentPath, pathd);
  const vue2Package = {
    srcDir: getPath('../for-vue2/src/packages'),
    destDir: getPath('../dist/npm/for-vue2'),
  };
  const vue3Package = {
    srcDir: getPath('../for-vue3/src/packages'),
    destDir: getPath('../dist/npm/for-vue3'),
  };
  checkoutDir(vue2Package.destDir);
  checkoutDir(vue3Package.destDir);
  delDir(vue2Package.destDir);
  delDir(vue3Package.destDir);
  copyPackages(vue2Package.srcDir, vue2Package.destDir);
  copyPackages(vue3Package.srcDir, vue3Package.destDir);
  const vue2PackagePath = path.resolve(CurrentPath, '../for-vue2/node_modules/vue');
  const newVue2PackagePath = path.resolve(CurrentPath, '../for-vue2/node_modules/vue_old');
  if (fs.existsSync(vue2PackagePath)) {
    fs.renameSync(vue2PackagePath, newVue2PackagePath);
  }
  spawn('yarn vitepress build', { shell: true, stdio: 'inherit' });
  fs.renameSync(newVue2PackagePath, newVue2PackagePath);
};
