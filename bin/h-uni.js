// #!/usr/bin/env node
import columnify from 'columnify';
import * as argvs from './argvs/index.js';

const argv = process.argv[2];

// 输入可用命令参数
const help = () => {
  const columns = Object.keys(argvs).map((key) => ({
    Parameter: key,
    Description: argvs[key].description,
  }));

  const content = columnify(columns, { minWidth: 30 });

  console.log(`
[h-uni]：可用命令如下：
${content}`);
};

const mian = () => {
  if (!argv) {
    return help();
  }

  const item = Object.keys(argvs).find((key) => key === argv);

  if (!item) {
    return help();
  }

  return argvs[item].fn();
};

mian();
