/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';
import components from './sidebar/components';
import utils from './sidebar/utils';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  lang: 'zh-CN',
  outDir: path.resolve(CurrentPath, '../doc'),
  srcExclude: ['dist/npm/**/*'],
  title: 'h-uni',
  lastUpdated: true,
  cleanUrls: true,
  // Vite config options
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(CurrentPath),
      },
    },
  },
  // 路径重写
  rewrites: {
    ':for/src/packages/:type/:dd/README.md': ':for/:type/:dd.md',
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    // 顶部导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '开始', link: '/README' },
      { text: '组件', link: '/for-vue2/components/HButton', activeMatch: '/components' },
      { text: '工具', link: '/for-vue2/utils/Hhttp', activeMatch: '/utils' },
      { text: '更新记录', link: '/CHANGELOG' },
      {
        text: '网站导航',
        items: [
          { text: 'uniapp 官网', link: 'https://uniapp.dcloud.net.cn/' },
          { text: 'hewxing.cn', link: 'http://hewxing.cn' },
          { text: '3D 示例', link: 'http://3d.hewxing.cn' },
        ],
      },
    ],
    // 侧边栏
    sidebar: {
      '/for-vue2/components/': [
        {
          text: '组件库',
          items: components,
        },
      ],
      '/for-vue3/components/': [
        {
          text: '组件库',
          items: components,
        },
      ],
      '/for-vue2/utils/': [
        {
          text: '工具库',
          items: utils,
        },
      ],
      '/for-vue3/utils/': [
        {
          text: '工具库',
          items: utils,
        },
      ],
    },
    // 链接图标
    socialLinks: [{ icon: 'github', link: 'https://github.com/hewx815/h-uni' }],
    outline: false,
  },
});
