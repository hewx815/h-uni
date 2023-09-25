import type { App } from 'vue';
import * as utils from './utils';

export * from './utils';
export type * from './components';

export default {
  install: (Vue: App) => {
    Vue.config.globalProperties.$h = utils;
  },
};
