import { ProjectOptions } from '@vue/cli-service/types/ProjectOptions';

/**
 * 扩展的编译前和编译后的函数接口
 */
type Hooks = (api: ProjectOptions, options: object, args: Array<string>) => void;

interface Config {

  /**
   * 项目编译后自动打开开发者工具，适用于使用 cli 搭建的 uniapp 项目
   * - https://h-uni.hewxing.cn/for-vue2/plugins/vue-cli-plugin-h-uni-build#opendevtools
  */
  openDevTools?: '' | false | {
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
  };

  /**
   * 项目编译前提示选择模式启动，模式中可配置该模式使用的 manifest.json 文件、pages.json 文件、env 环境变量，或者只更改部分选择
   * - https://h-uni.hewxing.cn/for-vue2/plugins/vue-cli-plugin-h-uni-build#setmode
  */
  setMode?: '' | false | Array<{

    /**
     *  模式的名称
     */
    name?: string;

    /**
     *  为此模式设置的环境变量
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env?: Record<string, any>;

    /**
     *  该模式的manifest.json文件
     */
    manifestJson?: string | object;

    /**
     *  该模式的pages.json文件
     */
    pagesJson?: string | object;
  }>;

  /**
   * `vue-cli-plugin-h-uni-build`构建前的回调函数
   * - https://h-uni.hewxing.cn/for-vue2/plugins/vue-cli-plugin-h-uni-build#beforebuild-%E5%92%8C-afterbuild
  */
  beforeBuild?: '' | false | ((api: ProjectOptions, options: object, args: Array<string>) => void);

  /**
  * `vue-cli-plugin-h-uni-build`构建后的回调函数
  * - https://h-uni.hewxing.cn/for-vue2/plugins/vue-cli-plugin-h-uni-build#beforebuild-%E5%92%8C-afterbuild
  */
  afterBuild?: '' | false | ((api: ProjectOptions, options: object, args: Array<string>) => void);

  /**
   * 是否在编译前删掉上一次编译的旧文件
   * - https://h-uni.hewxing.cn/for-vue2/plugins/vue-cli-plugin-h-uni-build#deloldfile
  */
  delOldFile?: boolean;
}

export function defineConfigHuniBuild(config: Config): Config;
