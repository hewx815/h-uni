/* eslint-disable no-console */

import { execSync } from 'child_process';

export default {
  description: '初始化 h-uni-build',
  fn: () => {
    execSync('yarn add file:node_modules/h-uni/dist/for-vue2/plugins/vue-cli-plugin-h-uni-build');

    console.log('[h-uni]:vue-cli-plugin-h-uni-build 初始化成功！');
  },
};
