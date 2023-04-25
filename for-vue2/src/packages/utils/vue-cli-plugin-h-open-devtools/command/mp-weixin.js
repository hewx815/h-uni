const { spawn } = require('child_process');

// 登录处理
const isLogin = spawn('cli islogin', { shell: true, stdio: 'inherit' });
isLogin.on('exit', (code) => {
  if (code === 0) {
    const isLogin = spawn('cli islogin', { shell: true, stdio: 'inherit' });
  } else {
    const isLogin = spawn('cli login -f base64', { shell: true, stdio: 'inherit' });
  }
  console.log(code);
});

// 打开项目
