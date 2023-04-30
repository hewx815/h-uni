#!/usr/bin/env node
<<<<<<< HEAD
<<<<<<< HEAD
import columnify from 'columnify';
import * as argvs from './argvs/index.js';
=======
// eslint-disable-next-line node/no-unpublished-bin
import columnify from 'columnify';
import * as argvs from './argvs';
>>>>>>> development
=======
// eslint-disable-next-line node/no-unpublished-bin
import columnify from 'columnify';
import * as argvs from './argvs/index';
>>>>>>> development

const argv = process.argv[2];

// 输入可用命令参数
const help = () => {
  const columns = Object.keys(argvs).map((key) => ({
    Parameter: key,
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // eslint-disable-next-line import/namespace
>>>>>>> development
=======
    // eslint-disable-next-line import/namespace
>>>>>>> development
    Description: argvs[key].description,
  }));

  const content = columnify(columns, { minWidth: 30 });

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // eslint-disable-next-line no-console
>>>>>>> development
=======
  // eslint-disable-next-line no-console
>>>>>>> development
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // eslint-disable-next-line import/namespace
>>>>>>> development
=======
  // eslint-disable-next-line import/namespace
>>>>>>> development
  return argvs[item].fn();
};

mian();
