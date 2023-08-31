---
outline: deep
---

# vite-plugin-h-uni-build

## 介绍

这是一个`vite`插件，插件扩展了在开发中常用的功能:

- [`openDevTools`](#opendevtools) 项目构建后自动打开开发者工具
- [`setMode`](#setmode) 可以以指定的模式启动，使用动态的 `manifest.json` `pages.json` `env` 环境变量
- [`beforeBuild`](#beforebuild)、[`afterBuild`](#afterbuild) 用于自定义扩展的构建前和构建后的函数接口
- [`delOldFile`](#deloldfile) 项目构建前先删掉上一次构建的旧文件内容

## 兼容性

<SupportTable WEIXIN H5="不支持 afterBuild 钩子函数" TOUTIAO BAIDU ALIPAY LARK/>

## 安装

1. 完成[`h-uni`安装](/README.html#安装)
2. 在项目的`vite.config.js`文件中，从`h-uni/for-vue3/utils`导入插件`hUniBuild`,并且到在`plugins`字段中调用

```js
// vite.config.js
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { hUniBuild } from './src/packages/utils';

export default defineConfig({
  plugins: [uni(), hUniBuild({
    // 配置项
  })],
  // ...
});

```
## openDevTools

- **类型:** `Object || false`

项目构建后自动打开开发者工具，适用于使用 `vite` 搭建的 uniapp 项目

- **使用示例**

正确配置后，在项目中运行你的启动命令，如：

```shell
yarn dev:mp-weixin

# 在uniapp打包构建`完成后`会自动打开对微信开发者工具
```

- **启用或关闭此功能**

把`openDevTools`配置成`false`,或者将此配置项置空,此功能即关闭

- **平台差异说明**

由于各平台开发者工具支持功能参差不全以及不同平台开发的差异，因此会有很多的差异化内容

但`openDevTools`都保证了基本的`打开开发者工具`功能

::: danger H5

不支持此功能选项！详见：[特殊处理 dev:h5](#特殊处理-dev-h5)

:::

::: warning 头条

- 受抖音开发者工具限制，不支持自动打开项目，需手动导入项目(项目路径会自动复制至粘贴板)
- 使用poweshell命令行工具时, [`exitClose`](#opendevtools-exitclose) 会导致当前进程意外退出

:::

::: warning 百度

- 受百度开发者工具限制，不支持自动打开项目，需手动导入项目(项目路径会自动复制至粘贴板)
- 使用poweshell命令行工具时, [`exitClose`](#opendevtools-exitclose) 会导致当前进程意外退出

:::

::: warning 飞书

- 受飞书开发者工具限制，不支持自动打开项目，需手动导入项目(项目路径会自动复制至粘贴板)
- 使用poweshell命令行工具时, [`exitClose`](#opendevtools-exitclose) 会导致当前进程意外退出

:::

::: info 微信

- 如果未登录，会在控制台打印登录二维码，扫码登录

:::

### openDevTools.paths

- **类型:** `Object`

`Object<key>`:开发者工具标识

`Object<value>`:开发者工具的安装路径(绝对路径)

```js
// ...
hUniBuild({
   openDevTools: {
     paths: {
       "mp-weixin": "D:\\wechatDev\\微信web开发者工具",
       // ... 其他开发者工具目录
     },
   },
})
// ...
```

### openDevTools.exitClose

- **类型:** `Boolean`
- **默认:** `false`

在命令行中使用`ctrl+c`退出进程时是否关闭开发者工具

### openDevTools.projectDir

- **类型:** `String`
- **默认:** `uniapp` 默认构建输出文件夹

构建后项目的路径(绝对路径)

## setMode

- **类型:** `Array<object> || false`

项目构建前提示选择模式启动，模式中可配置该模式使用的 `manifest.json` 文件、`pages.json` 文件、`env` 环境变量，或者只更改部分选择

::: warning 默认配置

如果使用`setMode`并配置了`setModeItem.manifestJson`或`setModeItem.pagesJson`

首次启动后，不能在原来的`manifest.json`或`pages.json`文件中配置

需要在生成的`pagesDefault.json`或`manifestDefault.json`中配置默认的配置项

:::

- **使用示例**

配置了一个名称为：`模式1` 的启动方式

以该模式启动的环境变量`APP_MODE`为`"模式1"`

把`./src/manifestMode1.json`作为该模式的`manifest.json`

以该模式启动的`navigationBarBackgroundColor`为黑色`(#000)`

```js
import path from 'path'
import { fileURLToPath } from 'url';

// filePath:当前文件的绝对文件路径，此处和`__dirname`功能相同
const filePath = path.dirname(fileURLToPath(import.meta.url));
// ...
hUniBuild({
  setMode: [
    {
      name: "模式1",
      env: {
        APP_MODE: '"模式1"',
      },
      manifestJson: path.resolve(filePath, "./src/manifestMode1.json"),
      pagesJson: {
        globalStyle: {
          navigationBarBackgroundColor: "#999",
        },
      },
    },
  ],
})
// ...
```

- **启用或关闭此功能**

把`setMode`配置成`false`、空数组`[]`,或者将此配置项置空,此功能即关闭

### setModeItem.name

- **类型:** `String`

模式的名称

### setModeItem.env

- **类型:** `Object`

为此模式设置的环境变量

 `Object<key>` : `String` : 环境变量名称

`Object<value>` : `String` : 环境变量内容

```js
// ...
hUniBuild({
  setMode: [
    {
      name: "模式1",
      env: {
        APP_MODE: '"模式1"',
      },
    },
  ],
})
// ...

// index.vue
console.log(process.env.APP_MODE === "模式1"); // true
```

### setModeItem.manifestJson

- **类型:** `String || Object`

该模式的`manifest.json`文件

`String`:指定一个`manifest.json`文件路径

`Object`:覆盖原有的`manifest.json`中的部分配置

### setModeItem.pagesJson

- **类型:** `String || Object`

该模式的`pages.json`文件

`String`:指定一个`pages.json`文件路径

`Object`:覆盖原有的`pages.json`中的部分配置

### pagesDefault.json 和 manifestDefault.json

如果启用了`setMode`,每次运行时都会在项目根目录更新`pagesDefault.json`或`manifestDefault.json`

如果不存在`pagesDefault.json`或`manifestDefault.json`，则自动从`manifest.json`或`pages.json`中获取配置并生成文件

如果存在，则把`pagesDefault.json`或`manifestDefault.json`作为`默认配置项`

如果选项是`Object`类型，则把`setModeItem.manifestJson`或`setModeItem.pagesJson`中的配置项覆盖`pagesDefault.json`或`manifestDefault.json`并写入`manifest.json`或`pages.json`作为该模式的启动文件

## beforeBuild
- **类型:** `function`
- **参数:** `(options, env)`

`vite-plugin-h-uni-build`运行前的回调函数

函数参数与 `Vite` 独有钩子 [`config`](https://vitejs.cn/vite3-cn/guide/api-plugin.html#vite-specific-hooks) 参数一致

## afterBuild

- **类型:** `function`
- **参数:** `(error)`

`vite-plugin-h-uni-build`运行后的回调函数

函数参数与 `rollup` 钩子 [`buildend`](https://cn.rollupjs.org/plugin-development/#buildend) 参数一致

::: danger H5

不支持此功能选项！详见：[特殊处理 dev:h5](#特殊处理-dev-h5)

:::

## delOldFile

- **类型:** `Boolean`
- **默认** `false`

是否在构建前删掉上一次构建的旧文件

::: tip
有时候当你改了半天的bug却看不到结果的任何变化，此时这个功能些许能帮上你的忙🧐
:::

## 特殊处理：`dev:h5`

`dev:h5`暂不支持`afterbuild`和`openDevTools`

**`openDevTools`解决方案：**

`dev:h5` 一般情况下调试在浏览器中进行，可以直接使用`vite`自带功能:[`开发服务器`](https://vitejs.cn/vite3-cn/config/server-options.html),即可实现自动打开浏览器功能：

```js
// vite.config.js
export default defineConfig({
  plugins: [uni(), hUniBuild({...})],
  server: {
    port: 8080,
    host: 'localhost',
    open:true
  },
});
```

**`afterbuild`暂未解决**

