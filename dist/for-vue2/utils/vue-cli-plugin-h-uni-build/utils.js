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
 * @description 获取运行命令文件
 * @return {String}  filePath 获取运行命令文件路径
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
 * @description 校验路径
 * @return {Boolean}
*/
const validPath = (pathD) => {
  try {
    return fs.statSync(pathD).isDirectory();
  } catch (e) {
    return false;
  }
};

/**
 * @description 深度合并对象
 * @param {Object} objs
*/
const mergeObjects = (...objs) => {
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isPlainObject(target) && isPlainObject(source)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in source) {
        if (isPlainObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  }
  const result = {};
  objs.forEach((obj) => {
    mergeDeep(result, obj);
  });
  return result;
};

module.exports = {
  err, log, getCommandPath, validPath, mergeObjects,
};
