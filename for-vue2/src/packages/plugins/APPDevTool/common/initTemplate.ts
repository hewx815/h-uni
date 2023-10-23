import path from 'path';
import { fileURLToPath } from 'url';
import { type Argvs } from '../index.js';
import {
  log, err, checkPathExists, copyDir,
} from '../utils.js';

// TODO:此处逻辑有问题，需重构
export default function init(argvs: Argvs, platform: 'ios' | 'android' | 'all' = 'all') {
  const baseIosTemplatePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../template/ios');

  const baseAndroidTemplatePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../template/android');

  const iosInitPath = path.resolve(process.cwd(), 'ios');

  const androidInitPath = path.resolve(process.cwd(), 'android');

  let userInitPath = process.cwd();

  // 初始化初始化路径
  if (argvs.initPath === true) {
    err('initPath 参数需要指定路径');
    return;
  }

  if (argvs.initPath) {
    userInitPath = argvs.initPath;

    if (checkPathExists(path.resolve(userInitPath, 'ios'))) {
      log(`${userInitPath} 目录已存在， 请先删除`);
      return;
    }

    if (checkPathExists(path.resolve(userInitPath, 'android'))) {
      log(`${userInitPath} 目录已存在， 请先删除`);
      return;
    }

    log('开始初始化模板');

    copyDir(baseIosTemplatePath, path.resolve(userInitPath, 'ios'));
    copyDir(baseAndroidTemplatePath, path.resolve(userInitPath, 'android'));

    log('初始化模板成功');
  } else {
    switch (platform) {
      case 'all':
        if (checkPathExists(androidInitPath)) {
          log(`${androidInitPath} 目录已存在， 请先删除`);
          return;
        }

        if (checkPathExists(iosInitPath)) {
          log(`${iosInitPath} 目录已存在，请先删除`);
          return;
        }

        log('开始初始化模板');

        copyDir(baseIosTemplatePath, iosInitPath);
        copyDir(baseAndroidTemplatePath, androidInitPath);

        log('初始化模板成功');
        break;

      case 'android':
        if (checkPathExists(androidInitPath)) {
          log(`${androidInitPath} 目录已存在， 请先删除`);
          return;
        }

        log('开始初始化模板');

        copyDir(baseAndroidTemplatePath, androidInitPath);

        log('初始化模板成功');
        break;

      case 'ios':
        if (checkPathExists(iosInitPath)) {
          log(`${iosInitPath} 目录已存在，请先删除`);
        }

        log('开始初始化模板');

        copyDir(baseIosTemplatePath, iosInitPath);

        log('初始化模板成功');
        break;

      default:
        break;
    }
  }
}
