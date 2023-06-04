---
outline: 'deep'
---

# vue-cli-plugin-h-uni-build(扩展`uni-build`)

## 介绍

这是一个`h-uni`的`内置`插件，扩展了 `uni-app` 原生的 `uni-build`

插件已经扩展了在开发中常用的功能，并提供了编译前和编译后的函数接口更灵活的扩展`uni-build`

详细功能见[`配置项`](#配置项)

## 兼容性

<SupportTable WEIXIN VUE2 />

## 安装

简单三步完成`vue-cli-plugin-h-uni-build`的安装

**1.首先确保您已经成功安装了`h-uni`**

在您的项目根目录运行以下命令：

::: code-group

```shell [yarn]
yarn h-uni
```
```shell [npm]
npm run h-uni
```
:::

如果您看到了h-uni的提示，证明h-uni已正确安装到您的项目中

如果没有，请移步至：[h-uni 安装](/README.html#安装)

**2.内置的`vue-cli-plugin-h-uni-build`插件默认是没有启用的，我们需要手动启用**

在您的项目根目录运行以下命令：

::: code-group

```shell [yarn]
yarn h-uni initHUniBuild
```
```shell [npm]
npm run h-uni initHUniBuild
```
:::

成功后您会看到成功提示

**3.配置插件**

[`配置项`](#配置项)应该在项目根目录的`vue.config.js`文件中的`pluginOptions`中的`h-uni-build`中配置

```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    'h-uni-build': {
      // options
    },
  },
};

```

## 配置项

[`openDevTools`](#opendevtools):开发者工具启动器

[`setMode`](#setmode):为项目设置启动模式

[`beforeBuild`](#beforebuild-和-afterbuild):`uni-build`构建之前的回调函数

[`afterBuild`](#beforebuild-和-afterbuild):`uni-build`构建之后的回调函数



## openDevTools

- **类型:** `Object || false`

项目编译后自动打开开发者工具，适用于使用cli搭建的uniapp项目

-  **使用示例**

正确配置后，在项目中运行你的启动命令，如：

```shell
yarn dev:mp-weixin

# 在uniapp打包编译`完成后`会自动打开对微信开发者工具
```



- **启用或关闭此功能**

把`openDevTools`配置成`false`,或者将此配置项置空,此功能即关闭

---

### openDevTools.paths
- **类型:** `Object`

`Object<key>`:开发者工具标识

`Object<value>`:开发者工具的安装路径(绝对路径)

```javascript

module.exports = {
  pluginOptions: {
    openDevTools:{
      paths:{
        'mp-weixin':'D:\\wechatDev\\微信web开发者工具',
        // ... 其他开发者工具目录
      },
    },
  },
};
```

---

### openDevTools.exitClose
- **类型:** `Boolean`
- **默认:** `false`

退出时是否关闭开发者工具

::: info 微信平台：

1.如果`未登录`会在控制台打印登录二维码，扫码登录

2.`ctrl+c`退出进程时会提示：是否阻止关闭开发者工具，3s未选择后自动关闭

:::

---

### openDevTools.projectDir
- **类型:** `String`
- **默认:** `uniapp` 默认编译输出文件夹

编译后项目的路径(绝对路径)

---

## setMode
- **类型:** `Array<object> || false`

项目编译前以指定的模式启动，模式中可配置该模式使用的 `manifest.json` 文件、`pages.json` 文件、`env` 环境变量，或者只更改部分选择，

-  **使用示例**

```javascript
// TODO:
```

- **启用或关闭此功能**

把`setMode`配置成`false`、空数组`[]`,或者将此配置项置空,此功能即关闭


---

### setModeitem.name
- **类型:** `String`

模式的名称

---

### setModeitem.env
- **类型:** `Object`

为此模式设置的环境变量

`Object<key>`:环境变量名称

`Object<value>`环境变量内容

```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    'h-uni-build': {
      setMode: [
        {
          name: '模式1',
          env: {
            APP_MODE: '"模式1"',
          },
        },
      ],
    },
  },
};

// index.vue
console.log(process.env.APP_MODE === '模式1'); // true


```

---

### setModeitem.manifestJson
- **类型:** `String || Object`

该模式的`manifest.json`文件

`String`:指定一个`manifest.json`文件路径

`Object`:覆盖原有的`manifest.json`文件运行

---

### setModeitem.pagesJson
- **类型:** `String || Object`

该模式的`pages.json`文件

`String`:指定一个`pages.json`文件路径

`Object`:覆盖原有的`pages.json`文件运行

---

## beforeBuild 和 afterBuild
- **类型:** `function`

构建前运行`beforeBuild`,比内置插件更早

构建后运行`afterBuild`,比内置插件更晚

可处理异步任务

---






