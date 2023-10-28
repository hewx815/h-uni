/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-multiple-empty-lines */
export type Icon = {
  /**
   * 默认
   */
  dpi: IconOption;

  /**
   * 低密度
   */
  ldpi?: IconOption;

  /**
   * 中等密度
   */
  mdpi?: IconOption;

  /**
   * 高密度
   */
  hdpi?: IconOption;

  /**
   * 超高密度
   */
  xhdpi?: IconOption;

  /**
   * 超超高密度
   */
  xxhdpi?: IconOption;

  /**
   * 超超超高密度
   */
  xxxhdpi?: IconOption;

  /**
   * 无缩放
   */
  nohdpi?: IconOption;
};

export type IconOption = {
  icon: string;
  push: string;
  splash: string;
};

export type Signing = {
  /**
   * 签名别名
  */
  keyAlias: string;

  /**
   * 签名密码
  */
  keyPassword: string;

  /**
   * 证书文件路径，相对路径或绝对路径
  */
  storeFile: string;

  /**
   * 证书密码
  */
  storePassword: string;
};

export interface Config {
  /**
   * appID
  */
  appID?: string;

  /**
   * APP 资源目录
   */
  resourceDir?: string;

  /**
   * 安卓项目配置项
   */
  android?: {
    /**
     * uniSDK 路径
    */
    uniSdkPath?: string;

    /**
     * Android SDK 路径
     */
    androidSdkPath?: string;

    /**
     * Java 安装路径
     */
    javaPath?: string;

    /**
     * appKey
     * * 申请appKey:
     *
     * 1.登录: https://dev.dcloud.net.cn/pages/common/login?uniIdRedirectUrl=%252Fpages%252Fapp%252Flist
     *
     * 2.在应用管理 - 点击应用 - 各平台信息 创建以及查看离线AppKey
     *
     * * 申请后不需要再安卓项目中配置，直接在此处配置即可
     */
    appKey?: string;

    /**
     * 应用的包名，一般设置为反向域名
     */
    applicationId?: string;

    /**
     * 应用的版本号（整数值），用于各应用市场的升级判断
    */
    versionCode?: number;

    /**
     * 应用的版本名称（字符串），在系统应用管理程序中显示的版本号
    */
    versionName?: string;

    /**
     * 签名选项，默认使用公共测试证书
    */
    signing?: Signing;

    /**
     * 应用图标配置
     */
    icon?: {
      /**
       * 默认
       */
      dpi: Icon;

      /**
       * 低密度
       */
      ldpi?: Icon;

      /**
       * 中等密度
       */
      mdpi?: Icon;

      /**
       * 高密度
       */
      hdpi?: Icon;

      /**
       * 超高密度
       */
      xhdpi?: Icon;

      /**
       * 超超高密度
       */
      xxhdpi?: Icon;

      /**
       * 超超超高密度
       */
      xxxhdpi?: Icon;

      /**
       * 无缩放
       */
      nohdpi?: Icon;
    };
  };

  /**
   * 苹果项目配置项
   */
  ios?: {
    /**
     * 包名或三方appid
     */
    BundleId: string;
  };
}

export const defineConfigAPPDevTool = (config: Config): Config => config;
