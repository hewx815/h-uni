/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { fileURLToPath } from 'url';
import {
  hUniBuild,
  defineConfigHUniBuild,
} from './src/packages/plugins/vite-plugin-h-uni-build';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

const config = defineConfigHUniBuild({
  delOldFile: true,
  setMode: false,
  openDevTools: {
    paths: {
      'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
    },
  },
  afterBuild() {
    console.log('vite-plugin-h-uni-build afterBuild');
  },
});

export default defineConfig({
  plugins: [uni(), hUniBuild(config)],
  server: {
    port: 8080,
    host: 'localhost',
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      '@2': path.resolve(CurrentPath, '../for-vue2/src/packages'),
    },
  },
});
