import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  log, err, checkPathExists, copyDir,
} from '../utils.js';

function initProject(
  templatePath: string,
  initPath: string,
) {
  if (!checkPathExists(templatePath)) {
    log(`缺少模板文件：${templatePath}`);
  }

  if (checkPathExists(initPath)) {
    log(`${initPath} 目录已存在， 请先删除`);
  }

  copyDir(templatePath, initPath);
}

export default function initTemplate(
  projectPath: string,
  platform: 'ios' | 'android' | 'all',
) {
  const iosTemplatePath = resolve(dirname(fileURLToPath(import.meta.url)), '../template/ios');

  const androidTemplatePath = resolve(dirname(fileURLToPath(import.meta.url)), '../template/android');

  const iosInitPath = resolve(projectPath, '');

  const androidInitPath = resolve(projectPath, '');

  switch (platform) {
    case 'all':
      initProject(androidTemplatePath, androidInitPath);
      initProject(iosTemplatePath, iosInitPath);
      break;

    case 'android':
      initProject(androidTemplatePath, androidInitPath);
      break;

    case 'ios':
      initProject(iosTemplatePath, iosInitPath);
      break;

    default:
      err('不支持的 platform');
      break;
  }
}
