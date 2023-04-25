const fs = require('fs');
const path = require('path');

const err = (message) => {
  throw new Error(`
[h-open-devtools:Error]:${message}
`);
};

const log = (message) => {
  // eslint-disable-next-line no-console
  console.log(`
[h-open-devtools]:${message}
`);
};

/**
 * @description 获取运行命令文件
*/
const getCommandPath = async () => {
  const platFrom = process.env.UNI_PLATFORM;
  const filePath = path.resolve(__dirname, `./command/${platFrom}.js`);
  const stats = await fs.statSync(filePath);
  if (stats.isFile()) {
    return filePath;
  }
  return log(`${platFrom}---暂未支持`);
};

module.exports = {
  err, log, getCommandPath,
};
