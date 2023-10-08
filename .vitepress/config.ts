import path from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';
import components from './sidebar/components';
import utils from './sidebar/utils';
import plugins from './sidebar/plugins';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  lang: 'zh-CN',
  outDir: path.resolve(CurrentPath, '../website'),
  srcExclude: ['dist/**/*'],
  title: 'h-uni',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // 百度
    ['meta', { name: 'baidu-site-verification', content: 'codeva-8gKQSKSvPS' }],
  ],
  // Vite config options
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(CurrentPath),
      },
    },
    server: {
      host: '127.0.0.1',
      port: 8000,
    },
  },
  markdown: {
    cache: false,
    theme: {
      light: 'material-theme-lighter',
      dark: 'material-theme',
    },
  },
  // 路径重写
  rewrites: {
    ':for/src/packages/:type/:dd/README.md': ':for/:type/:dd.md',
  },
  themeConfig: {
    editLink: {
      pattern: ({ filePath }) => `https://github.com/hewx815/h-uni/edit/development/${filePath}`,
      text: '帮助我改善此页面',
    },

    logo: 'http://static.hewxing.cn/h-uni/logo/logo.png',
    search: {
      provider: 'local',
    },
    // 顶部导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '开始', link: '/README' },
      { text: '组件库', link: '/for-vue2/components/HTab', activeMatch: '/components' },
      { text: '函数库', link: '/for-vue2/utils/Hhttp', activeMatch: '/utils' },
      { text: '插件库', link: '/for-vue2/plugins/vue-cli-plugin-h-uni-build', activeMatch: '/plugins' },
      { text: '更新日志', link: '/CHANGELOG' },
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
          text: '函数库',
          items: utils,
        },
      ],
      '/for-vue3/utils/': [
        {
          text: '函数库',
          items: utils,
        },
      ],
      '/for-vue2/plugins/': [
        {
          text: '插件库',
          items: plugins,
        },
      ],
      '/for-vue3/plugins/': [
        {
          text: '插件库',
          items: plugins,
        },
      ],
    },
    // 链接图标
    socialLinks: [{ icon: 'github', link: 'https://github.com/hewx815/h-uni' }],
  },
});
