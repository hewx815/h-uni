/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default {
  description: '查看当前版本',
  fn: () => {
    const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

    const packageJsonPath = path.resolve(CurrentPath, '../../package.json');

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

    const nowVersion = packageJson.version;

    console.log(`
[h-uni]:

当前版本：${nowVersion}
`);
  },
};
