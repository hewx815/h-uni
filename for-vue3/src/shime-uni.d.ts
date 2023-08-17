/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks { }
}
export { };
