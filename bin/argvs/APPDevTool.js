import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

export default {
  description: 'App 开发工具',
  fn: () => {
    const { argv, env } = process;
    const argvs = argv.slice(3).join(' ');

    if (env.NODE_ENV === 'development') {
      const APPDevTool = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../for-vue2/src/packages/plugins/APPDevTool/run.ts');
      spawnSync(`ts-node ${APPDevTool} ${argvs}`, { shell: true, stdio: 'inherit' });
    } else {
      const APPDevTool = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist/for-vue2/plugins/APPDevTool/run.js');
      spawnSync(`node ${APPDevTool} ${argvs}`, { shell: true, stdio: 'inherit' });
    }
  },
};
