/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { hUniBuild, defineConfigHUniBuild } from './src/packages/plugins/vite-plugin-h-uni-build';

const config = defineConfigHUniBuild({
  delOldFile: true,
  setMode: false,
  openDevTools: {
    paths: {
      'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
    },
  },
});

export default defineConfig({
  plugins: [uni(), hUniBuild(config)],
  server: {
    port: 8080,
    host: 'localhost',
  },
});
