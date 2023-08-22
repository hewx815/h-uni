import * as components from './components/index';

declare module '@vue/runtime-core' {
  type Components = typeof components;
  interface GlobalComponents extends Components { }
}
export { };
