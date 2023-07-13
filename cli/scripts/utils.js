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
 * @description 拷贝文件夹
 * @param {*} srcDir 要被拷贝的源文件夹
 * @param {*} destDir 拷贝操作的目标文件夹
*/
export const copyDirs = (srcDir, destDir) => {
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

/**
 * @description 递归删除指定目录及其子目录下的所有 README.md 文件
 * @param {String} dir - 目标目录的路径
 */
export const deleteReadmeFiles = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      deleteReadmeFiles(filePath); // 递归处理子目录
    } else if (file === 'README.md') {
      fs.unlinkSync(filePath);
    }
  });
};

/**
 * @description 将指定目录下所有以 PascalCase 命名的文件夹和文件重命名为 kebab-case。
 * @param {string} directoryPath - 目录路径。
 */
export const renameFilesToKebabCase = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    // eslint-disable-next-line no-console
    console.error('Directory does not exist:', directoryPath);
    return;
  }

  //  判断是否为 PascalCase 命名。
  function isPascalCase(name) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * 获取文件名（不包含扩展名）。
   * @param {string} fileName - 文件名。
   * @returns {string} 文件名（不包含扩展名）。
   */
  function getFileName(fileName) {
    return path.parse(fileName).name;
  }

  /**
   * 获取文件扩展名。
   * @param {string} fileName - 文件名。
   * @returns {string} 文件扩展名（包含点号）。
   */
  function getFileExtension(fileName) {
    return path.parse(fileName).ext;
  }

  /**
   * 将 PascalCase 转换为 kebab-case。
   * @param {string} name - 文件或文件夹名称。
   * @returns {string} 转换后的 kebab-case 名称。
   */
  function convertToKebabCase(name) {
    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // 将小写字母和大写字母之间插入短横线
      .replace(/([A-Z])([A-Z])([a-z0-9])/g, '$1-$2$3') // 将连续的大写字母和紧随其后的小写字母/数字之间插入短横线
      .toLowerCase(); // 将结果转换为小写字母形式
  }

  /**
   * 递归遍历目录。
   * @param {string} directory - 目录路径。
   */
  function traverseDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (isPascalCase(file)) {
          const kebabCaseName = convertToKebabCase(file);
          const newFilePath = path.join(directory, kebabCaseName);

          fs.renameSync(filePath, newFilePath);

          // 递归调用，重命名文件夹内部的文件
          traverseDirectory(newFilePath);
        } else {
          // 非 PascalCase 命名的文件夹，继续递归遍历
          traverseDirectory(filePath);
        }
      } else if (isPascalCase(getFileName(file))) {
        const kebabCaseName = convertToKebabCase(getFileName(file));
        const newFilePath = path.join(directory, `${kebabCaseName}${getFileExtension(file)}`);

        fs.renameSync(filePath, newFilePath);
      }
    });
  }

  traverseDirectory(directoryPath);
};

/**
 * @description 将文件内容引号内的文本转换为kebab-case 格式，并将转换后的内容写入原文件。
 * @param {string} filePath - 文件路径。
 */
export const transformAndWriteFile = (filePath) => {
  // 将字符串转换为 kebab-case 格式。
  function convertToKebabCase(name) {
    return name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z])([a-z0-9])/g, '$1-$2$3')
      .toLowerCase();
  }

  /**
 * 将文件内容转换为指定格式的导出语句。
 * @param {string} fileContent - 文件内容。
 * @returns {string} 转换后的文件内容。
 */
  function transformContent(fileContent) {
    const transformedLines = fileContent
      .split('\n')
      .map((line) => {
        const match = line.match(/from\s+(['"])(.*?)\1/);
        if (match) {
          const transformedPath = convertToKebabCase(match[0]);
          return line.replace(/from\s+(['"])(.*?)\1/, transformedPath);
        }
        return line;
      });

    return transformedLines.join('\n');
  }

  if (!fs.existsSync(filePath)) {
    // eslint-disable-next-line no-console
    console.error('File does not exist:', filePath);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const transformedContent = transformContent(fileContent);
  fs.writeFileSync(filePath, transformedContent, 'utf-8');
};
