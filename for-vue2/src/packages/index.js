import * as utils from './utils';

function install(Vue) {
  // 挂载全局方法
  Vue.prototype.$h = utils;
  uni.$h = utils;
}
export default {
  install,
};
