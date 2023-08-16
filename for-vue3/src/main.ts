import { createSSRApp } from 'vue';
import App from './App.vue';

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
