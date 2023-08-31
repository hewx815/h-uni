/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VueConstructor } from 'vue';
import * as utils from './utils';

export default {
  install: (Vue: VueConstructor) => {
    Vue.prototype.$h = utils;
  },
};
