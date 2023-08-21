import fs, { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 存储文件绝对路径
const StorageFilePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './index.json');

/**
 * @name setStorageSync
 * @description 存储数据 (相同的键会覆盖)
 * @param {String} key 要存储数据的键
 * @param {Any} value 要存储数据内容
 * @return {Promise}
*/
export const setStorageSync = async (key, value) => {
  let data = null;
  if (existsSync(StorageFilePath)) {
    const oldData = fs.readFileSync(StorageFilePath, 'utf-8');
    data = oldData ? JSON.parse(oldData) : {};
  } else {
    data = {};
  }

  data[key] = {
    updataTime: String(new Date()),
    data: value,
  };

  fs.writeFileSync(StorageFilePath, JSON.stringify(data), 'utf-8');
};

/**
 * @name getStorageSync
 * @description 读取数据
 * @param {String} key 要读取数据的键
 * @return {Promise} resolve 读取到的数据内容
*/
export const getStorageSync = async (key) => {
  if (!existsSync(StorageFilePath)) {
    return undefined;
  }

  const oldData = fs.readFileSync(StorageFilePath, 'utf-8');
  const data = oldData ? JSON.parse(oldData) : undefined;
  return data ? data[key].data : undefined;
};
