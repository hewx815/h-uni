// eslint-disable-next-line import/extensions
import DefaultTheme from 'vitepress/theme';
import { EnhanceAppContext } from 'vitepress';
import './custom.css';
import { Component } from 'vue';
import * as allComponents from '../../components/index';

const components: Record<keyof typeof allComponents, Component> = allComponents;

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    Object.keys(components).forEach((key: keyof typeof components) => {
      ctx.app.component(key, components[key]);
    });
  },
};
