#!/usr/bin/env node
// eslint-disable-next-line node/no-unpublished-bin
import columnify from 'columnify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/extensions
import * as argvs from './argvs/index.js';

const argv = process.argv[2];

// 输入可用命令参数
const help = () => {
  const columns = Object.keys(argvs).map((key) => ({
    Parameter: key,
    // eslint-disable-next-line import/namespace
    Description: argvs[key].description,
  }));

  const content = columnify(columns, { minWidth: 30 });
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

  const packageJsonPath = path.resolve(CurrentPath, '../package.json');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

  const homeUrl = packageJson.homepage;

  // eslint-disable-next-line no-console
  console.log(`
[h-uni]：可用命令如下：
${content}

更多信息：${homeUrl}
`);
};

const mian = () => {
  if (!argv) {
    return help();
  }

  const item = Object.keys(argvs).find((key) => key === argv);

  if (!item) {
    return help();
  }

  // eslint-disable-next-line import/namespace
  return argvs[item].fn();
};

mian();
