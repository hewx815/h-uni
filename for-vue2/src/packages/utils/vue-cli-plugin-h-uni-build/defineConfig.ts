import { ProjectOptions } from "@vue/cli-service/types/ProjectOptions";

interface OpenDevTools {
  /**
   * 开发者工具的安装路径
   */
  paths?: {
    "mp-weixin"?: string;
    "mp-alipay"?: string;
    "mp-baidu"?: string;
    "mp-toutiao"?: string;
    "mp-lark"?: string;
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

type SetMode = Array<SetModeItem>;
interface SetModeItem {
  /**
   *  模式的名称
   */
  name?: string;
  /**
   *  为此模式设置的环境变量
   */
  env?: Record<string, any>;
  /**
   *  该模式的manifest.json文件
   */
  manifestJson?: string | object;
  /**
   *  该模式的pages.json文件
   */
  pagesJson?: string | object;
}

/**
 * 扩展的编译前和编译后的函数接口
 */
type Hooks = (api: ProjectOptions, options: object, args: Array<any>) => void;

interface Config {
  openDevTools?: OpenDevTools | "" | false;
  setMode?: SetMode | "" | false;
  beforeBuild?: Hooks | "" | false;
  afterBuild?: Hooks | "" | false;
  delOldFile?: boolean;
}

export default (config: Config) => config;
