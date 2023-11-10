import iosServer from './iosServer/index.js';
import androidServer from './androidServer/index.js';
import { log } from './utils.js';
import { help } from './common/index.js';

export interface Argvs {
  /**
   * 启动开发
  */
  dev?: string | true;
  /**
   * 启动安卓开发
  */
  devAndroid?: string | true;
  /**
   * 启动苹果开发
  */
  devIos?: string | true;
  /**
   * 项目根目录
  */
  root?: string | true;
  /**
   * 配置文件路径
  */
  config?: string | true;
  /**
   * 构建项目的位置
  */
  project?: string | true;
  /**
   * 帮助
  */
  help?: string | true;
}

export const realArgvs: Argvs = {
  dev: undefined,
  devAndroid: undefined,
  devIos: undefined,
  root: undefined,
  config: undefined,
  project: undefined,
  help: undefined,
};

/**
 * 启动APPDevTool
*/
export default async function start(argvs: Argvs) {
  process.env.H_UNI_APPDEVTOOL_ENV = 'development';

  Object.keys(argvs).forEach((key) => {
    if (!(key in realArgvs)) {
      log(`未知参数：--${key}`);
      help();
    }
  });

  if (argvs.dev) {
    await androidServer(argvs);
    await iosServer(argvs);
    return;
  }

  // 启动安卓开发
  if (argvs.devAndroid) {
    await androidServer(argvs);
    return;
  }

  // 启动苹果开发
  if (argvs.devAndroid) {
    await iosServer(argvs);
    return;
  }

  // 帮助
  help();
}
