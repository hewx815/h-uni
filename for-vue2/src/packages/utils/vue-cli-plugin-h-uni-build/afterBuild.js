const { spawn } = require('child_process');
const {
  getCommandPath, validPath, err,
} = require('./utils');

/**
 * @description uni-build 之后运行的函数
*/
module.exports = async (api, options) => {
  const { openDevTools, afterBuild } = options.pluginOptions['h-uni-build'] ? options.pluginOptions['h-uni-build'] : {};
  /**
   * @name openDevTools
  */
  if (openDevTools) {
    // 获取命令文件路径
    const commandPath = getCommandPath();
    if (!commandPath) {
      return;
    }

    // 获取开发者路径
    const platFrom = process.env.UNI_PLATFORM;
    const devToolPath = openDevTools.path[platFrom];
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
      // 退出：第四个参数为 1
      process.on('SIGINT', () => {
        const exitCmd = spawn('cmd.exe', ['/c', `node ${commandPath} ${projectDir} 1`], { cwd: devToolPath });
        exitCmd.on('exit', () => {
          process.exit();
        });
      });
    }
  }

  /**
   * @name afterBuild
  */
  if (afterBuild) {
    await afterBuild(api, options);
  }
};
