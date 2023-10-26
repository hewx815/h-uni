import iosServer from './iosServer/index.js';
import androidServer from './androidServer/index.js';
import { filterArgs } from './utils.js';
import { help } from './common/index.js';

export interface Argvs {
  dev?: string | true;
  devAndroid?: string | true;
  devIos?: string | true;
  devPath?: string | true;
  configPath?: string | true;
  help?: string | true;
}

const argvs: Argvs = filterArgs(process.argv);

async function start() {
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
