import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  log, err, checkPathExists, copyDir, deleteFolderContents,
} from '../utils.js';

async function initProject(
  templatePath: string,
  initPath: string,
) {
  if (!checkPathExists(templatePath)) {
    log(`缺少模板文件：${templatePath}`);
  }
  if (checkPathExists(initPath)) {
    await deleteFolderContents(initPath);
  }

  copyDir(templatePath, initPath);
}

export default async function initTemplate(
  projectPath: string,
  platform: 'ios' | 'android' | 'all',
) {
  const iosTemplatePath = resolve(dirname(fileURLToPath(import.meta.url)), '../template/ios');

  const androidTemplatePath = resolve(dirname(fileURLToPath(import.meta.url)), '../template/android');

  const iosInitPath = resolve(projectPath, '');

  const androidInitPath = resolve(projectPath, '');

  switch (platform) {
    case 'all':
      await initProject(androidTemplatePath, androidInitPath);
      await initProject(iosTemplatePath, iosInitPath);
      break;

    case 'android':
      await initProject(androidTemplatePath, androidInitPath);
      break;

    case 'ios':
      await initProject(iosTemplatePath, iosInitPath);
      break;

    default:
      err('不支持的 platform');
      break;
  }
}
