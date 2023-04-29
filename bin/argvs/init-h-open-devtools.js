import { execSync } from 'child_process';

export default {
  description: '初始化h-open-devtools',
  fn: () => {
    execSync('yarn add file:node_modules/h-uni/dist/npm/for-vue2/utils/vue-cli-plugin-h-run-devtools');
    console.log('[h-uni]:vue-cli-plugin-h-run-devtools 初始化成功！');
  },
};
