/* eslint-disable no-console */

import fs from 'fs';

export default {
  description: '查看当前版本',
  fn: () => {
    const packageJson = JSON.parse(fs.readFileSync('../../package.json', 'utf-8'));

    const nowVersion = packageJson.version;

    console.log(`[h-uni]:当前版本：${nowVersion}`);
  },
};
