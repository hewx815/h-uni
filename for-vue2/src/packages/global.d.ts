import * as components from './components/index';
import * as utils from './utils/index';

declare module '@vue/runtime-dom' {
  type Components = typeof components;
  interface GlobalComponents extends Components { }

  interface ComponentCustomProperties {
    /**
     * h-uni 全局方法
    */
    $h: typeof utils;
  }
}

export { };
