const projectPath = process.argv[2];
const isExit = process.argv[3];
const clipboardy = require('clipboardy');
const { spawn } = require('child_process');
const { log, err } = require('../utils');

// 打开
const run = () => new Promise((resolve, reject) => {
  spawn('start 百度开发者工具.exe', { shell: true })
    .on('exit', (code) => (code === 0 ? resolve(code) : reject(code)))
    .on('error', (error) => reject(error));
});

// 关闭
const exit = () => new Promise((resolve, reject) => {
  spawn('taskkill /f /t /im  百度开发者工具.exe', { shell: true })
    .on('exit', (code) => (code === 0 ? resolve() : reject()))
    .on('error', (error) => reject(error));
});

if (Number(isExit) === 1) {
  exit()
    // eslint-disable-next-line no-process-exit
    .then(() => process.exit())
    .catch((error) => err(`未能正确关闭开发者工具
${error}`));
} else {
  run()
    .then(() => {
      log('百度开发者工具已启动');
      clipboardy.writeSync(projectPath);
      log(`百度开发者工具暂未支持打开项目，请手动导入项目路径：

      ${projectPath}（已复制至粘贴板）

      `);
      return '';
    })
    .catch((error) => err(`未能正确打开开发者工具
    ${error}`));
}
