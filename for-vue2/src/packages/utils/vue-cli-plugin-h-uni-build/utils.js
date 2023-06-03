const fs = require('fs');
const path = require('path');

const err = (message) => {
  throw new Error(`
[h-uni-build]:${message}
`);
};

const log = (message) => {
  // eslint-disable-next-line no-console
  console.log(`
[h-uni-builds]:${message}
`);
};

/**
 * 获取运行命令文件
*/
const getCommandPath = () => {
  const platFrom = process.env.UNI_PLATFORM;
  const filePath = path.resolve(__dirname, `./command/${platFrom}.js`);
  try {
    const stats = fs.statSync(filePath).isFile();
    if (stats) {
      return filePath;
    }
    return log(`${platFrom}---暂未支持`);
  } catch (e) {
    return log(`${platFrom}---暂未支持`);
  }
};

/**
 * 校验路径
*/
const validPath = (pathD) => fs.statSync(pathD).isDirectory();

module.exports = {
  err, log, getCommandPath, validPath,
};
