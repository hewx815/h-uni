const { spawn } = require('child_process');
const { err, log, getCommandPath } = require('./utils');

const main = async (api, options) => {
  // 获取配置
  const userConfig = options.pluginOptions['h-open-devtools'];

  if (!userConfig) {
    err('缺少配置！');
  }

  const config = {
    projectPath: userConfig.projectPath || options.outputDir,
    wxPath: userConfig.wxPath,
  };

  // 获取命令文件路径
  const commandPath = await getCommandPath();
  const child = spawn('cmd.exe', ['/c', `node ${commandPath}`], { cwd: config.wxPath, stdio: 'inherit' });
};

module.exports = (api, options) => {
  const serve = api.service.commands['uni-build'];
  const serveFn = serve.fn;

  serve.fn = (...args) => serveFn(...args)
    .then(() => main(api, options))
    .catch((errs) => { err(errs); });
};
