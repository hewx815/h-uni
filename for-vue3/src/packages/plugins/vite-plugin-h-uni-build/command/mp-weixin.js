/* eslint-disable no-shadow */
/* eslint-disable no-console */
const { spawn } = require('child_process');
const { err, log } = require('./utils.js');

const projectPath = process.argv[2];
const isExit = process.argv[3];

// 是否登录
const isLogin = () => new Promise((resolve) => {
  const dd = spawn('cli islogin', { shell: true });
  dd.stdout.on('data', (data) => {
    resolve(JSON.parse(String(data)).login);
  });
});

// 打开项目
const openProject = (projectPathD) => new Promise((resolve, reject) => {
  try {
    spawn(`cli open --project ${projectPathD}`, { shell: true, stdio: 'inherit' })
      .on('exit', (code) => (code === 0 ? resolve() : reject()));
  } catch (err) {
    reject();
  }
});

// 登录
const login = () => new Promise((resolve, reject) => {
  spawn('cli login', { shell: true, stdio: 'inherit' })
    .on('exit', (code) => (code === 0 ? resolve() : reject()));
});

// 退出
const exit = () => new Promise((resolve, reject) => {
  spawn('cli quit', { shell: true, stdio: 'inherit' })
    .on('exit', (code) => (code === 0 ? resolve() : reject()));
});

// eslint-disable-next-line no-shadow
const main = async (projectPath) => {
  try {
    const loginStatus = await isLogin();
    if (loginStatus) {
      log('已登录微信开发者工具');
      try {
        await openProject(projectPath);
      } catch (err) {
        log('登录已失效,请重新登录');
        await login();
      }
    } else {
      log('未登录微信开发者工具');
      await login();
      log('请使用微信扫描二维码登录');
      await openProject(projectPath);
    }
  } catch (e) {
    err(e);
  }
};

if (Number(isExit) === 1) {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  exit().then(() => {
    // eslint-disable-next-line no-process-exit
    process.exit();
  });
} else {
  main(projectPath);
}
