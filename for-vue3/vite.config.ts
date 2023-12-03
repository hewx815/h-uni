/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { fileURLToPath } from 'url';
// import {
//   hUniBuild,
//   defineConfigHUniBuild,
// } from './src/packages/plugins/vite-plugin-h-uni-build';
// eslint-disable-next-line import/no-relative-packages
// import { startAPPDevTool } from '../for-vue2/src/packages/plugins/APPDevTool';

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

// const config = defineConfigHUniBuild({
//   delOldFile: true,
//   setMode: false,
//   openDevTools: {
//     paths: {
//       'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
//     },
//   },
//   async afterBuild() {
//     if (process.env.UNI_PLATFORM === 'app') {
//       await startAPPDevTool({ devAndroid: true, root: '../' });
//     }
//     if (process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'production') {
//       process.exit(0);
//     }
//   },
// });

export default defineConfig({
  plugins: [uni()], // hUniBuild(config)
  server: {
    port: 8080,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@2': path.resolve(CurrentPath, '../for-vue2/src/packages'),
    },
  },
});
