const { err } = require('./utils.cjs');

const main = (api, options) => {
  console.log(options);
  // 获取配置
  const userConfig = options['h-open-devtools'];

  if (!userConfig) {
    err('缺少配置！');
  }

  const config = {
    projectPath: userConfig.projectPath || options.outputDir,
    wxPath: userConfig.projectPath,
  };
};

module.exports = (api, options) => {
  const serve = api.service.commands['uni-build'];
  const serveFn = serve.fn;

  serve.fn = (...args) => serveFn(...args)
    .then(() => main(api, options))
    .catch((errs) => err(errs));
};
