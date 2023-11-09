import iosServer from './iosServer/index.js';
import androidServer from './androidServer/index.js';
import { filterArgs, log } from './utils.js';
import { help } from './common/index.js';

export interface Argvs {
  dev?: string | true;
  devAndroid?: string | true;
  devIos?: string | true;
  root?: string | true;
  config?: string | true;
  project?: string | true;
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

const argvs = filterArgs(process.argv);

async function start() {
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

await start();
