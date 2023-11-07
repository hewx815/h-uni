import type { Config } from 'config.js';

// 按指定顺序获取sdk路径，效验是否有效(有命令行工具)，效验下载指定版本，如果没有有效的路径，可选择自动初始化sdk路径下载指定版本，反之报错退出
export default async function getSdkPath(config?: { config: Config, path: string; }) {
  function checkoutCmdlineTool(path) {

  }

  function checkoutTools(path) {

  }

  function installTools(tools: string[]) {

  }
}
