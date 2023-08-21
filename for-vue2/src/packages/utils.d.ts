import * as utils from './utils/index';

declare module '@vue/runtime-dom' {
  interface ComponentCustomProperties {
    /**
     * h-uni 全局方法
    */
    $h?: typeof utils;
  }
}
export { };
