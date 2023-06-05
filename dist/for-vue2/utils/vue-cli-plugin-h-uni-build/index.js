const afterBuild = require('./afterBuild');
const beforeBuild = require('./beforeBuild');

module.exports = (api, options) => {
  const serve = api.service.commands['uni-build'];
  const serveFn = serve.fn;

  const fn = async (...args) => {
    await beforeBuild(api, options, args);
    await serveFn(...args);
    await afterBuild(api, options, args);
  };
  serve.fn = (...args) => fn(...args);
};
