// eslint-disable-next-line import/no-extraneous-dependencies
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, exec } from 'child_process';

/**
 * @description 选择开发配置
 * @param {Array} configList 配置列表
 * @return {Promise} devConfig
*/
export const choiceDevConfig = async (configList) => {
  const { devConfig } = await inquirer.prompt([
    {
      type: 'list',
      name: 'devConfig',
      message: '请选择',
      choices: configList,
    },
  ]);
  return devConfig;
};

/**
 * @description 选择开发目录
 * @param {Array} folderList 目录列表
 * @return {Promise} devFolder
*/
export const choiceDevFolder = async (folderList) => {
  const { devFolder } = await inquirer.prompt([
    {
      type: 'list',
      name: 'devFolder',
      message: '请选择选择开发目录',
      choices: folderList,
    },
  ]);
  return devFolder;
};

/**
 * @description 获取scripts列表
 * @param {String} devFolder 开发目录
 * @return {Array} scriptsList
*/
export const getScriptsList = async (devFolder) => {
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
  const data = await fs.promises.readFile(path.resolve(CurrentPath, '../../', devFolder, 'package.json'), 'utf-8');
  const { scripts } = JSON.parse(data);
  return Object.keys(scripts).map((key) => key);
};

/**
 * @description 选择script命令
 * @param {Array} scriptsList
 * @return {String} script
*/
export const choiceScript = async (scriptsList) => {
  const { script } = await inquirer.prompt([
    {
      type: 'list',
      name: 'script',
      message: '请选择运行节点',
      choices: scriptsList,
    },
  ]);
  return script;
};

/**
 * @description 运行命令
 * @param {String} devFolder 开发目录
 * @param {String} script 运行节点
*/
export const runStart = (devFolder, script) => {
  // 要执行的命令
  const command = `cd ${devFolder}&&npm run ${script}`;
  // eslint-disable-next-line no-console
  console.clear();
  const child = exec('vitepress dev --host');
  child.stdout.on('data', (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });
  spawn(command, { shell: true, stdio: 'inherit' });
};

/**
 * @description 拷贝package包
 * @param {*} srcDir 要被拷贝的源文件夹
 * @param {*} destDir 拷贝操作的目标文件夹
*/
export const copyPackages = (srcDir, destDir) => {
  const copyFile = async (src, dest) => {
    fs.copyFileSync(src, dest);
  };
  const copyDir = async (src, dest) => {
    fs.mkdirSync(dest);
    const files = fs.readdirSync(src);
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        copyFile(srcPath, destPath);
      }
    }
  };
  copyDir(srcDir, destDir);
};

/**
 * @description 删除文件夹下所有文件
 * @param {String} path 要删除的文件夹路径
*/
// eslint-disable-next-line no-shadow
export const delDir = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
};

/**
 * @description 传入文件夹的路径看是否存在，存在不用管，不存在则直接创建文件夹
 * @param {String}  reaPath 文件路径，绝对路径
 * @returns {Promise<boolean>}
*/
export const checkoutDir = (filePath) => {
  const ensureDirectoryExistence = (filePath1) => {
    const dirname = path.dirname(filePath1);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
    return true;
  };
  ensureDirectoryExistence(filePath);
};
