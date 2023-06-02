---
outline: 'deep'
---

# vue-cli-plugin-h-run-devtools(开发者工具启动插件)

## 介绍

这是一个`h-uni`的`内置`插件，帮助开发者在开发：通过 `vue-cli` 创建的 uni-app 项目时，自动开打开对应平台的开发者工具

## 兼容性

<SupportTable WEIXIN VUE2 />

## 安装

简单三步完成`vue-cli-plugin-h-run-devtools`的安装

### 1.首先确保您已经成功安装了`h-uni`

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

### 2.内置的`vue-cli-plugin-h-run-devtools`插件默认是没有启用的，我们需要手动启用

在您的项目根目录运行以下命令：

::: code-group

```shell [yarn]
yarn h-uni initHRunDevtools
```
```shell [npm]
npm run h-uni initHRunDevtools
```
:::

成功后您会看到成功提示

### 3.配置插件

在项目根目录的`vue.config.js`文件中的`pluginOptions`字段增加`h-run-devtools`字段

给插件提供开发者工具的安装目录，或者更改其配置项

```javascript
module.exports = {
  // other ...
  pluginOptions: {
    // other ...
    'h-open-devtools': {
      'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
    },
    // other ...
  },
    // other ...
};

```

`h-run-devtools`可用配置项如下：

`outputDir`:编译项目的输出文件目录

`mp-weixin`:微信开发者工具安装目录

::: warning 警告
以上的目录都是绝对路径
:::

## 使用

如果您成功安装并启用了`vue-cli-plugin-h-run-devtools`

接下来在项目中运行你的启动命令，如：

```shell
yarn dev:mp-weixin
```

在uniapp打包编译`完成后`会自动打开对应平台的开发者工具

::: info 微信平台：

1.如果`未登录`会在控制台打印登录二维码，扫码登录

2.`ctrl+c`退出进程时会提示：是否阻止关闭开发者工具，3s未选择后自动关闭

:::




