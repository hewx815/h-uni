import iosServer from './iosServer/index.js';
import androidServer from './androidServer/index.js';
import { filterArgs } from './utils.js';
import { initTemplate, help } from './common/index.js';

export interface Argvs {
  init?: string | true;
  initAndroid?: string | true;
  initIos?: string | true;
  initPath?: string | true;
  dev?: string | true;
  devAndroid?: string | true;
  devIos?: string | true;
  devPath?: string | true;
  configPath?: string | true;
  help?: string | true;
}

const argvs: Argvs = filterArgs(process.argv);

async function start() {
  // 初始化模板
  if (argvs.init) {
    initTemplate(argvs);
    return;
  }

  // 初始化安卓模板
  if (argvs.initAndroid) {
    initTemplate(argvs, 'android');
    return;
  }

  // 初始化苹果模板
  if (argvs.initIos) {
    initTemplate(argvs, 'ios');
    return;
  }

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
