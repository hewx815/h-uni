const { spawn } = require('child_process');

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
  spawn(`cli open --project ${projectPathD}`, { shell: true, stdio: 'inherit' })
    .on('exit', (code) => (code === 0 ? resolve() : reject()));
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
  const loginStatus = await isLogin();
  if (loginStatus) {
    // eslint-disable-next-line no-console
    console.log('已登录微信开发者工具');
    await openProject(projectPath);
  } else {
    // eslint-disable-next-line no-console
    console.log('未登录微信开发者工具');
    await login();
    // eslint-disable-next-line no-console
    console.log('请使用微信扫描二维码登录');
    await openProject(projectPath);
  }
};

if (Number(isExit) === 1) {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  exit().then(() => {
    process.exit();
  });
} else {
  main(projectPath);
}
