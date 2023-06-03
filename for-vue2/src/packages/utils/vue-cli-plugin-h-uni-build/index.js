const afterBuild = require('./afterBuild');
const beforeBuild = require('./beforeBuild');

module.exports = (api, options) => {
  const serve = api.service.commands['uni-build'];
  const serveFn = serve.fn;

  const fn = async (...args) => {
    await beforeBuild(api, options);
    await serveFn(...args);
    await afterBuild(api, options);
  };
  serve.fn = (...args) => fn(...args);
};
