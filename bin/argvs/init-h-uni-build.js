import { execSync } from 'child_process';

export default {
  description: '初始化 h-uni-build',
  fn: () => {
    execSync('yarn add file:node_modules/h-uni/dist/for-vue2/utils/vue-cli-plugin-h-uni-build');
    // eslint-disable-next-line no-console
    console.log('[h-uni]:vue-cli-plugin-h-uni-build 初始化成功！');
  },
};
