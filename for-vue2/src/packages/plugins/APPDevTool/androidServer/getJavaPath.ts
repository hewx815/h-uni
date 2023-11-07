import { spawnSync } from 'child_process';
import { resolve, delimiter } from 'path';
import type { Config } from 'config.js';
import { checkPathExists, err } from '../utils.js';
import { JAVA_V } from './constant.js';
// 按指定顺序获取java路径，效验是否有效，效验是否为指定版本，选择可用路径，如果没有退出
export default function getJavaPath(
  config?: { config: Config, path: string; },
): {
  path: string,
  version: string,
  description: string,
} {
  function getVersion(path: string): string | false {
    const { stderr: stdout, error } = spawnSync(
      './java',
      ['-version'],
      {
        cwd: resolve(path, './bin'),
        encoding: 'utf-8',
      },
    );

    if (error) return false;

    const str = stdout.split('\r\n')[0];

    if (str.indexOf('openjdk version') !== 0 && str.indexOf('java version') !== 0) return false;

    const version = str.split(' ')[2].replace(/"/g, '').split('.');

    let versionStr = '';

    if (Number(version[0]) > 10) {
      versionStr = `JavaVersion.VERSION_${version[0]}`;
    }

    if (Number(version[0]) > 25) {
      versionStr = 'JavaVersion.VERSION_HIGHER';
    }

    versionStr = `JavaVersion.VERSION_${version[0]}_${version[1]}`;

    if (versionStr !== JAVA_V) return false;

    return versionStr;
  }

  // config
  const configJavaPath = config?.config.android?.javaPath;

  if (configJavaPath && checkPathExists(configJavaPath)) {
    const configJavaVersion = getVersion(configJavaPath);

    if (configJavaVersion) {
      return {
        path: configJavaPath,
        version: configJavaVersion,
        description: `配置文件：${config.path} android.javaPath`,
      };
    }
  }

  // env JAVA_HOME
  const javaHome = process.env.JAVA_HOME as string;

  if (checkPathExists(javaHome)) {
    const javaHomeVersion = getVersion(javaHome);

    if (javaHomeVersion) {
      return {
        path: javaHome,
        version: javaHomeVersion,
        description: '环境变量 JAVA_HOME',
      };
    }
  }

  // env PATH
  const pathPath = (process.env.PATH as string)
    .split(delimiter)
    .find((path) => checkPathExists(resolve(path, './java')));

  if (pathPath) {
    const pathVersion = getVersion(pathPath);

    if (pathVersion) {
      return {
        path: pathPath,
        version: pathVersion,
        description: '环境变量 PATH',
      };
    }
  }

  // default
  const defaultPath = process.platform === 'win32' ? 'C:\\Program Files\\Java\\jdk-1.8' : '/Library/Java/JavaVirtualMachines';

  if (checkPathExists(defaultPath)) {
    const defaultVersion = getVersion(defaultPath);

    if (defaultVersion) {
      return {
        path: defaultPath,
        version: defaultVersion,
        description: '默认路径',
      };
    }
  }

  err('未找到有效的java路径', null, 'android');

  return {
    path: '',
    version: '',
    description: '',
  };
}
