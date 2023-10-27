import { resolve } from 'path';
import { checkPathExists, err } from '../utils.js';
import type { Config } from '../config.js';

export default function getResourcePath(
  userConfig: Config,
): string {
  const CLI_DEV_RESOURCE_PATH = resolve(process.cwd(), './dist/dev/app-plus');
  const VITE_DEV_RESOURCE_PATH = resolve(process.cwd(), './dist/dev/app');

  const CLI_BUILD_RESOURCE_PATH = resolve(process.cwd(), './dist/build/app-plus');
  const VITE_BUILD_RESOURCE_PATH = resolve(process.cwd(), './dist/build/app');

  if (userConfig.resourceDir) {
    if (checkPathExists(userConfig.resourceDir)) {
      return userConfig.resourceDir;
    }
    return err(`配置项：resourceDir 指定的 APP 资源目录：${userConfig.resourceDir} 不存在`) as string;
  }

  if (process.env.H_UNI_APPDEVTOOL_ENV === 'development') {
    // vue-cli
    if (checkPathExists(CLI_DEV_RESOURCE_PATH)) return CLI_DEV_RESOURCE_PATH;
    // vite
    if (checkPathExists(VITE_DEV_RESOURCE_PATH)) return VITE_DEV_RESOURCE_PATH;

    return err(`默认 APP 资源目录：${CLI_DEV_RESOURCE_PATH} 或 ${VITE_DEV_RESOURCE_PATH} 不存在`) as string;
  }

  if (process.env.H_UNI_APPDEVTOOL_ENV === 'production') {
    // vue-cli
    if (checkPathExists(CLI_BUILD_RESOURCE_PATH)) return CLI_BUILD_RESOURCE_PATH;
    // vite
    if (checkPathExists(VITE_BUILD_RESOURCE_PATH)) return VITE_BUILD_RESOURCE_PATH;

    return err(`默认 APP 资源目录：${CLI_BUILD_RESOURCE_PATH} 或 ${VITE_BUILD_RESOURCE_PATH} 不存在`) as string;
  }

  return err('未能正确获取 APP 资源目录') as string;
}
