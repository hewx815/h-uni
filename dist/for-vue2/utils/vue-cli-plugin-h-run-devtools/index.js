const { spawn } = require('child_process');
const {
  getCommandPath, validPath, getConfig,
} = require('./utils');

const main = async (api, options) => {
  // 获取用户配置
  const userConfig = options.pluginOptions['h-open-devtools'];

  // 获取命令文件路径
  const commandPath = getCommandPath();

  if (!commandPath) {
    return;
  }
  // 获取配置
  const config = getConfig(userConfig, options);

  // 检测路径是否存在
  Object.keys(config).forEach((key) => {
    validPath(config[key]);
  });

  // 运行：在开发者工具目录下执行cmd，运行对应平台对应的js，发送了第三个参数：传递项目路径
  spawn('cmd.exe', ['/c', `node ${commandPath} ${config.projectPath} 0`], { cwd: config.cwd, stdio: 'inherit' });

  // 退出：发送了第四个参数
  process.on('SIGINT', () => {
    const exitCmd = spawn('cmd.exe', ['/c', `node ${commandPath} ${config.projectPath} 1`], { cwd: config.cwd });
    exitCmd.on('exit', () => {
      process.exit();
    });
  });
};

module.exports = (api, options) => {
  const serve = api.service.commands['uni-build'];
  const serveFn = serve.fn;

  serve.fn = (...args) => serveFn(...args)
    .then(() => main(api, options));
};
