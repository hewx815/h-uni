/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import path, { join } from 'path';
import {
  readdir, stat, unlink, rmdir,
} from 'fs/promises';
/**
 * 控制台输出信息
 * @param message - 要记录的消息。
 */
export function log(message: unknown, type?: 'ios' | 'android') {
  const typeStr = type ? `[${type}]:` : '';
  // eslint-disable-next-line no-console
  console.log(`
[APPDevTool]:${typeStr}${String(message)}
`);
}

/**
 * 控制台输出错误信息
 * @param message - 要记录的消息。
 * @param where - 要记录的位置。
 */
export function err(message: unknown, e?: unknown, type?: 'ios' | 'android'): unknown {
  const typeStr = type ? `[${type}]:` : '';
  let stack = '';
  if (e) {
    stack = (e as Error).stack?.split('\n').slice(1).join('\n') || '';
  } else {
    stack = new Error().stack?.split('\n').slice(2).join('\n') || '';
  }
  const eMessage = !e ? '' : `

    message:${(e as Error).message}`;

  const text = `
[APPDevTool Error]:${typeStr}${String(message)}${eMessage}

${stack}
`;
  // eslint-disable-next-line no-console
  console.error(text);
  throw 'APPDevTool throw';
}

/**
 * 从命令行参数中过滤出键值对记录。
 * @param args - 要过滤的字符串数组。
 * @returns 一个键值对记录。
 */
export function filterArgs(args: string[]): Record<string, string | true | undefined> {
  const result: Record<string, string | true> = {};
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (value !== undefined && !value.startsWith('--')) {
        result[key] = value;
      } else {
        result[key] = true;
      }
    }
  }
  return result;
}

/**
 * 检查指定路径的文件或目录是否存在。
 * @param filePath - 要检查的路径(绝对路径)。
 * @returns 如果文件或目录存在，则返回true；否则返回false。
 */
export function checkPathExists(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 复制指定文件夹到指定目录。
 * @param srcDir - 要复制的文件夹路径。
 * @param destDir - 目标目录路径。
 * @returns 如果复制成功，则返回true；否则返回false。
 */
export function copyDir(srcDir: string, destDir: string) {
  try {
    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(srcDir);
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }

    return true;
  } catch (error) {
    err('复制文件夹出错', error);
    return false;
  }
}

/**
 * 获取指定文件的后缀名
 * @param {string} filePath - 文件路径
 * @returns {string} 文件后缀名
*/
export function getSuffixName(filePath: string) {
  const arr = filePath.split('.');
  return arr[arr.length - 1];
}

// TODO: 未完成
export function gradleToObject(): Promise<object> {
  return new Promise((resolve) => {
    resolve({});
  });
}

// TODO: 未完成
export function ObjectToGradle(): Promise<string> {
  return new Promise((resolve) => {
    resolve('');
  });
}

/**
 * 删除指定目录下的所有文件和文件夹。
 * @param dir - 要删除的目录路径。
*/
export async function deleteFolderContents(dir: string): Promise<void> {
  const files = await readdir(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      await deleteFolderContents(filePath);
      await rmdir(filePath);
    } else {
      await unlink(filePath);
    }
  }
}
