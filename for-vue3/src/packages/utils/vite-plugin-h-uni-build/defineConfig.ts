/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line node/no-unpublished-import
import type { UserConfig, ConfigEnv } from 'vite';

export interface OpenDevTools {
  /**
   * 开发者工具的安装路径
   */
  paths?: {
    'mp-weixin'?: string;
    'mp-alipay'?: string;
    'mp-baidu'?: string;
    'mp-toutiao'?: string;
    'mp-lark'?: string;
  };
  /**
   * 退出进程时是否关闭开发者工具
   */
  exitClose?: boolean;
  /**
   * 默认编译输出文件夹
   */
  projectDir?: string;
}

interface SetModeItem {
  /**
   *  模式的名称
   */
  name: string;
  /**
   *  为此模式设置的环境变量
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env?: Record<string, string>;
  /**
   *  该模式的manifest.json文件
   */
  manifestJson?: string | object;
  /**
   *  该模式的pages.json文件
   */
  pagesJson?: string | object;
}

export interface Config {
  /**
   * 项目编译后自动打开开发者工具
   */
  openDevTools?: OpenDevTools | '' | false;
  /**
   * 可以以指定的模式启动，使用动态的 manifest.json pages.json env 环境变量
   */
  setMode?: Array<SetModeItem> | '' | false;
  /**
 * 构建前回调函数
 */
  beforeBuild?: '' | false | ((options: UserConfig, env: ConfigEnv) => void | Promise<any>);
  /**
 * 构建后回调函数
 */
  afterBuild?: '' | false | ((error: unknown) => void | Promise<any>);
  /**
   * 是否在编译前删掉上一次编译的旧文件
  */
  delOldFile?: boolean;
}

export default (config: Config) => config;
