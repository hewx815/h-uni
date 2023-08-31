import * as utils from './utils/index';
import * as components from './components/index';

declare module '@vue/runtime-core' {
  type Components = typeof components;
  interface GlobalComponents extends Components { }

  interface ComponentCustomProperties {
    /**
     * h-uni 全局方法
    */
    $h?: typeof utils;
  }
}
export { };
