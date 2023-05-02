import * as components from './components';
import * as utils from './utils';

function install(Vue) {
  // 全局安装组件
  Object.keys(components).forEach((key) => {
    // eslint-disable-next-line import/namespace
    Vue.component(key, components[key]);
  });
  // 挂载全局方法
  Vue.prototype.$h = utils;
}
export default {
  install,
};
