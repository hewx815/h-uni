// #!/usr/bin/env node
import * as argvs from './argvs/index.js';

const argv = process.argv[0];

const help = () => {
  let content = '';
  Object.keys(argvs).forEach((key) => {
    content += `${key}------${argv[key]}`;
  });
  // eslint-disable-next-line no-console
  console.log(content);
};

const mian = () => {
  if (!argv) {
    return help();
  }

  const item = Object.keys(argvs).find((key) => key === argv);
  if (item === -1) {
    return help();
  }
  console.log(item);
  // return item.fn();
};

mian();
