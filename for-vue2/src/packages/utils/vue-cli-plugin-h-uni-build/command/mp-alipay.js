const projectPath = process.argv[2];
const isExit = process.argv[3];
const { spawn } = require('child_process');
const { minidev } = require('minidev');
const { err } = require('../utils');

const run = () => minidev.startIde({
  project: projectPath,
  appPath: process.cwd(),
});

const exit = () => new Promise((resolve, reject) => {
  spawn('taskkill /f /t /im  小程序开发者工具.exe', { shell: true })
    .on('exit', (code) => (code === 0 ? resolve() : reject()))
    .on('error', (error) => reject(error));
});

if (Number(isExit) === 1) {
  exit()
    .then(() => process.exit())
    .catch((error) => err(`未能正确关闭开发者工具
  ${error}`));
} else {
  run();
}
