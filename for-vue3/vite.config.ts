/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { hUniBuild, defineConfigHUniBuild } from './src/packages/utils';

const config = defineConfigHUniBuild({
  delOldFile: true,
  setMode: [
    {
      name: 'testmode1',
      env: {
        TEST_MODE: '007',
      },
    },
  ],
});

export default defineConfig({
  plugins: [uni(), hUniBuild(config)],
  server: {
    port: 8080,
    host: 'localhost',
  },
});
