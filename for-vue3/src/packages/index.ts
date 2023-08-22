import type { App, Component } from 'vue';
import * as components from './components';
import * as utils from './utils';

const Components: Record<keyof typeof components, Component> = components;

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
export const installUtils = (app: App) => {
  app.config.globalProperties.$h = utils;
};

/**
 * 挂载全局组件
*/
export const installComponents = (app: App) => {
  app.component('HTab', Components.HTab);
};
