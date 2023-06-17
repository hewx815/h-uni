const afterBuild = require('./afterBuild');
const beforeBuild = require('./beforeBuild');

module.exports = (api, options) => {
  // uni-serve
  const serve = api.service.commands['uni-serve'];
  const serveFn = serve.fn;

  const newServeFn = async (...args) => {
    await beforeBuild(api, options, args);
    await serveFn(...args);
    await afterBuild(api, options, args);
  };

  serve.fn = (...args) => newServeFn(...args);

  // uni-build
  const build = api.service.commands['uni-build'];
  const buildFn = build.fn;

  const newBuildFn = async (...args) => {
    await beforeBuild(api, options, args);
    await buildFn(...args);
    await afterBuild(api, options, args);
  };

  build.fn = (...args) => newBuildFn(...args);
};
