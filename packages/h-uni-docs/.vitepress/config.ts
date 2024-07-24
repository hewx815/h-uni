import path from 'path';
import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'url';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  lang: 'zh-CN',
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
});

