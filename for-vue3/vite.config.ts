/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { hUniBuild, defineConfigHUniBuild } from './src/packages/plugins/vite-plugin-h-uni-build';

const config = defineConfigHUniBuild({
  delOldFile: true,
  setMode: false,
});

export default defineConfig({
  plugins: [uni(), hUniBuild(config)],
  server: {
    port: 8080,
    host: 'localhost',
  },
});
