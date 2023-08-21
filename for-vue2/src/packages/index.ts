/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { VueConstructor } from 'vue/types/index';
import * as components from './components';
import * as utils from './utils';

// HACK: @vue/runtime-dom 在vue2 中的差异内容不补丁
const Components: Record<keyof typeof components, any> = components;

/**
 * 工具
*/
export * from './utils';

/**
 * 组件
*/
export * from './components';

/**
 * 挂载全局工具到`$h`
*/
export const installUtils = (Vue: VueConstructor) => {
  Vue.prototype.$h = utils;
};

/**
 * 挂载全局组件
*/
export const installComponents = (Vue: VueConstructor) => {
  Vue.component('HTab', Components.HTab);
  Vue.component('HTabItem', Components.HTabItem);
};
