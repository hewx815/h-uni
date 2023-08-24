/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { spawn } from 'child_process';
import type { Config } from './defineConfig';
import {
  getCommandPath, validPath, err, log,
} from './utils';

export default async function (config: Config, error: unknown) {
  const key = 'VITE_PLUGIN_H_UNI_BUILD_AFTER';
  process.env[key] = 'runing';

  const { openDevTools, afterBuild } = config || {};

  // openDevTools
  if (openDevTools) {
    const platFrom: any = process.env.UNI_PLATFORM;

    if (platFrom === 'h5') {
      log(`
      h5平台请使用vue-cli功能:
      在 vue.config.js 中 devServer.open设置为 true`);
      return;
    }

    if (!openDevTools.paths) {
      err('缺少\'paths\'配置');
    }

    // 获取命令文件路径
    const commandPath = getCommandPath();
    if (!commandPath) return;

    // 获取开发者路径
    if (platFrom && openDevTools.paths && (openDevTools.paths as any)[platFrom] === '') {
      err(`缺少openDevTools.paths.${platFrom}配置`);
      return;
    }
    const devToolPath = (openDevTools.paths as any)[platFrom];
    if (!validPath(devToolPath)) {
      err(`没有这样的文件夹：${devToolPath}`);
      return;
    }

    // 项目路径
    const projectDir = openDevTools.projectDir || process.env.UNI_OUTPUT_DIR;

    // 退出时是否关闭开发者工具
    const { exitClose } = openDevTools;

    // 运行：在开发者工具目录下执行cmd，运行对应平台对应的js，发送了第三个参数：传递项目路径
    spawn('cmd.exe', ['/c', `node ${commandPath} ${projectDir} 0`], { cwd: devToolPath, stdio: 'inherit' });

    if (exitClose) {
      // BUG mp-toutiao/mp-baidu/mp-lark powershell中会导致命令行异常退出 2023年7月28日10:16:25 by:hewx
      // XXX 减少体积：mp-alipay 可以移除minidev这个包,采用使用命令行方式  2023年8月3日11:39:59 by:hewx
      // 退出：第四个参数为 1
      process.on('SIGINT', () => {
        const exitCmd = spawn('cmd.exe', ['/c', `node ${commandPath} ${projectDir} 1`], { cwd: devToolPath });
        exitCmd.on('exit', () => {
          // eslint-disable-next-line no-process-exit
          process.exit();
        });
      });
    }
  }

  // afterBuild
  if (typeof afterBuild === 'function') {
    await afterBuild(error);
  }
}
