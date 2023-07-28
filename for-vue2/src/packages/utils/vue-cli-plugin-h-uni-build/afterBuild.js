/* eslint-disable no-unused-vars */
const { spawn } = require('child_process');
const {
  getCommandPath, validPath, err, log,
} = require('./utils');

/**
 * @description uni-build 之后运行的函数
*/
module.exports = async (api, options, args) => {
  const { openDevTools, afterBuild } = options.pluginOptions['h-uni-build'] ? options.pluginOptions['h-uni-build'] : {};

  // openDevTools
  if (openDevTools) {
    const platFrom = process.env.UNI_PLATFORM;

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
    if (!commandPath) {
      return;
    }

    // 获取开发者路径
    if (!openDevTools.paths[platFrom]) {
      err(`缺少paths.${platFrom}配置`);
      return;
    }
    const devToolPath = openDevTools.paths[platFrom];
    if (!validPath(devToolPath)) {
      err(`没有这样的文件夹：${devToolPath}`);
      return;
    }

    // 项目路径
    const projectDir = openDevTools.projectDir || options.outputDir;

    // 退出时是否关闭开发者工具
    const { exitClose } = openDevTools;

    // 运行：在开发者工具目录下执行cmd，运行对应平台对应的js，发送了第三个参数：传递项目路径
    spawn('cmd.exe', ['/c', `node ${commandPath} ${projectDir} 0`], { cwd: devToolPath, stdio: 'inherit' });

    if (exitClose) {
      // TODO: bug： mp-toutiao 会导致命令行异常退出 2023年7月28日10:16:25 by:hewx
      // 退出：第四个参数为 1
      process.on('SIGINT', () => {
        const exitCmd = spawn('cmd.exe', ['/c', `node ${commandPath} ${projectDir} 1`], { cwd: devToolPath });
        exitCmd.on('exit', () => {
          process.exit();
        });
      });
    }
  }

  // afterBuild
  if (typeof afterBuild === 'function') {
    await afterBuild(api, options, args);
  }
};
