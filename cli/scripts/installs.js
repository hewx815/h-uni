/* eslint-disable no-console */
import { spawnSync } from 'child_process';

const log = (message) => {
  console.log(`
[install]:${message}`);
};

const err = (message) => {
  console.error(`
[install Error]:${message}`);
};

try {
  log('开始安装依赖...');
  spawnSync('yarn', { shell: true, stdio: 'inherit' });
  log('主包依赖安装成功');

  log('开始安装for-vue2依赖...');
  spawnSync('cd for-vue2&&yarn', { shell: true, stdio: 'inherit' });
  log('for-vue2依赖安装成功');

  log('开始安装for-vue3依赖...');
  spawnSync('cd for-vue3&&yarn', { shell: true, stdio: 'inherit' });
  log('for-vue3依赖安装成功');

  log('依赖安装成功 ✔');
} catch (e) {
  err(e);
}
