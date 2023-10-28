---
outline: deep
---
# APPDevTool

## 介绍

该插件简化了 `uniapp` 离线打包的繁琐过程

一个配置文件解决 APP 打包问题，开发者只需关注配置文件，其余的工作交给 `APPDevTool` 处理


## 兼容性

<SupportTable APP/>

::: warning IOS
目前只支持 Android 平台，后续版本会增加 IOS 平台 支持
:::

## 安装

**1.安装 `h-uni`**

在您的项目根目录运行以下命令查看是否成功安装 `h-uni`：

::: code-group

```shell [yarn]
yarn h-uni
```

```shell [npm]
npx h-uni
```

:::


如果您看到了 h-uni 的提示，证明 h-uni 已正确安装到您的项目中

如果没有，请移步至：[h-uni 安装](/README.html#安装)

**2. 安装 `Android Studio`**

离线打包依赖于 `Android Studio`，因此必须安装。

安装教程参考：[Android Studio 安装教程](/docs/course/AndroidStudioInstall.md)


## 启动

在项目根目录下执行以下命令

::: code-group

``` shell [yarn]
yarn h-uni APPDevTool --devAndroid
```


``` shell [npm]
npx h-uni APPDevTool --devAndroid
```

:::

`APPDevTool` 会在项目根目录下生成并自动配置安卓离线打包项目，同时启用 文件监听服务

配置文件更改、项目代码更改、手动刷新 均会自动重新配置项目、打包apk、安装并运行至设备


## 配置项

`APPDevTool` 默认使用项目根目录下的 `APPDevTool.config.xx` 文件作为配置文件

目前支持的文件格式： .json | .js | .mjs | .cjs | .ts | .mts| .cts

### appID

- **类型：** `string`

- **默认：** `'__UNI__CA5CB1E'`

详情：[DCloud appid 用途/作用/使用说明](https://ask.dcloud.net.cn/article/35907)

### resourceDir

- **类型：** `string`

- **默认：** `'dist/dev/app-plus'`

app 资源目录

### android.uniSdkPath

- **类型：** `string`

- **默认：** `.uniSdk`

手动指定 uniSdkPath 路径

### android.androidSdkPath

- **类型：** `string`

- **默认：** `process.env.ANDROID_SDK_ROOT`

手动指定 androidSdk 路径

### android.javaPath

- **类型：** `string`

- **默认：** `process.env.JAVA_HOME`

手动指定 java 路径

### android.appKey

- **类型：** `string`

- **默认：** `'537cba7f932e287fd25900de910bc831'`

appKey

### android.applicationId

- **类型：** `string`

- **默认：** `'com.android.testa'`

应用的包名，一般设置为反向域名

### android.versionCode

- **类型：** `number`

- **默认：** `1`

应用的版本号（整数值），用于各应用市场的升级判断

### android.versionName

- **类型：** `string`

- **默认：** `'1.0'`

应用的版本名称（字符串），在系统应用管理程序中显示的版本号

### android.signing

- **类型：** `Signing`

```ts
type Signing = {
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
```

- **默认：** `COMMON_TEST_SIGNING`

```ts
const COMMON_TEST_SIGNING = {
  keyAlias: 'android',
  keyPassword: '123456',
  storeFile: 'default.keystore',
  storePassword: '123456',
};
```

应用签名选项，默认使用公共测试证书

### android.icon

- **类型：** `Icon`

```ts
type Icon = {
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

type IconOption = {
  icon: string;
  push: string;
  splash: string;
};

```

- **默认：** `dist/dev/app-plus`

应用图标配置

## 命令行参数

### --initAndroid

初始化 android 模板

### --initPath

初始化模板的位置(默认为当前目录下"android"文件夹)

### --devAndroid

编译 android

### --devPath

编译指定文件夹的项目(默认为当前目录下"android"文件夹)

### --configPath

使用配置文件的路径

### --help

查看帮助


## 疑难解答


