<<<<<<< HEAD
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import * as components from "../components";
=======
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import DefaultTheme from 'vitepress/theme';
import './custom.css';
import * as components from '../components';
>>>>>>> development

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    // register global components
    Object.keys(components).forEach((key) => {
<<<<<<< HEAD
=======
      // eslint-disable-next-line import/namespace
>>>>>>> development
      ctx.app.component(key, components[key]);
    });
  },
};
