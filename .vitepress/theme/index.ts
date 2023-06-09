/* eslint-disable import/no-extraneous-dependencies */
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import * as components from '../components';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    // register global components
    Object.keys(components).forEach((key) => {
      // eslint-disable-next-line import/namespace
      ctx.app.component(key, components[key]);
    });
  },
};
