const fs = require('fs');
const path = require('path');

const err = (message) => {
  throw new Error(`
[h-open-devtools]:${message}
`);
};

const log = (message) => {
  // eslint-disable-next-line no-console
  console.log(`
[h-open-devtools]:${message}
`);
};

/**
 * 获取配置
*/
const getConfig = (userConfig, options) => {
  const platFrom = process.env.UNI_PLATFORM;
  if (!userConfig[platFrom]) {
    err(`缺少配置： ${platFrom}`);
  }
  return {
    cwd: userConfig[platFrom],
    projectPath: userConfig.projectPath || options.outputDir,
  };
};

/**
 * 获取运行命令文件
*/
const getCommandPath = () => {
  const platFrom = process.env.UNI_PLATFORM;
  const filePath = path.resolve(__dirname, `./command/${platFrom}.js`);
  const stats = fs.statSync(filePath).isFile();
  if (stats) {
    return filePath;
  }
  return log(`${platFrom}---暂未支持`);
};

/**
 * 校验路径
*/
const validPath = (pathD) => {
  const dd = fs.statSync(pathD).isDirectory();
  if (!dd) {
    err(`没有这样的文件夹：${pathD}`);
  }
};

module.exports = {
  err, log, getCommandPath, validPath, getConfig,
};
