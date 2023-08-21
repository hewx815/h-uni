/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { hUniBuild } from './src/packages/utils';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hUniBuild(), uni()],

});
