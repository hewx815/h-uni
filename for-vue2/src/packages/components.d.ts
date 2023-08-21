import * as components from './components/index';

declare module '@vue/runtime-dom' {
  type Components = typeof components;
  interface GlobalComponents extends Components { }
}
export { };
