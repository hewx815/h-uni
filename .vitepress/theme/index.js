/* eslint-disable import/namespace */
/* eslint-disable import/no-extraneous-dependencies */
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import * as components from '../components';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    Object.keys(components).forEach((key) => {
      ctx.app.component(key, components[key]);
    });
  },
};
