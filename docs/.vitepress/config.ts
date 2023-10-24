import path from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  srcDir: path.resolve(CurrentPath, '../../../h-uni'),
  lang: 'zh-CN',
  outDir: path.resolve(CurrentPath, '../../website'),
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
    'docs/course/:dd.md': 'course/:dd.md',
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
      { text: '教程', link: '/course/AndroidStudioInstall', activeMatch: '/course' },
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
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'HTab 标签栏', link: '/for-vue2/components/HTab' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'HTab 标签栏', link: '/for-vue3/components/HTab' },
              ],
            },
          ],
        },
      ],
      '/for-vue3/components/': [
        {
          text: '组件库',
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'HTab 标签栏', link: '/for-vue2/components/HTab' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'HTab 标签栏', link: '/for-vue3/components/HTab' },
              ],
            },
          ],
        },
      ],
      '/for-vue2/utils/': [
        {
          text: '函数库',
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'Hhttp 网络请求', link: '/for-vue2/utils/Hhttp' },
                { text: 'cssConverter 样式转换器', link: '/for-vue2/utils/cssConverter' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'Hhttp 网络请求', link: '/for-vue3/utils/Hhttp' },
                { text: 'cssConverter 样式转换器', link: '/for-vue3/utils/cssConverter' },
              ],
            },
          ],
        },
      ],
      '/for-vue3/utils/': [
        {
          text: '函数库',
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'Hhttp 网络请求', link: '/for-vue2/utils/Hhttp' },
                { text: 'cssConverter 样式转换器', link: '/for-vue2/utils/cssConverter' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'Hhttp 网络请求', link: '/for-vue3/utils/Hhttp' },
                { text: 'cssConverter 样式转换器', link: '/for-vue3/utils/cssConverter' },
              ],
            },
          ],
        },
      ],
      '/for-vue2/plugins/': [
        {
          text: '插件库',
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'vue-cli-plugin-h-uni-build', link: '/for-vue2/plugins/vue-cli-plugin-h-uni-build' },
                { text: 'TypeHelper', link: '/for-vue2/plugins/TypeHelper' },
                { text: 'APPDevTool', link: '/for-vue2/plugins/APPDevTool' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'vite-plugin-h-uni-build', link: '/for-vue3/plugins/vite-plugin-h-uni-build' },
              ],
            },
          ],
        },
      ],
      '/for-vue3/plugins/': [
        {
          text: '插件库',
          items: [
            {
              text: 'for-vue2',
              collapsed: false,
              items: [
                { text: 'vue-cli-plugin-h-uni-build', link: '/for-vue2/plugins/vue-cli-plugin-h-uni-build' },
                { text: 'TypeHelper', link: '/for-vue2/plugins/TypeHelper' },
                { text: 'APPDevTool', link: '/for-vue2/plugins/APPDevTool' },
              ],
            },
            {
              text: 'for-vue3',
              collapsed: false,
              items: [
                { text: 'vite-plugin-h-uni-build', link: '/for-vue3/plugins/vite-plugin-h-uni-build' },
              ],
            },
          ],
        },
      ],
      '/course/': [
        { text: 'Android Studio 安装教程', link: '/course/AndroidStudioInstall' },
      ],
    },
    // 链接图标
    socialLinks: [{ icon: 'github', link: 'https://github.com/hewx815/h-uni' }],
  },
});
