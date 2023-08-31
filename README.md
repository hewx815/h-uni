---
aside: left
outline: deep
---

# h-uni
主页: https://h-uni.hewxing.cn

仓库: https://github.com/hewx815/h-uni

## 介绍

这是一个基于`uniapp`的**组件库、工具库**，**分别**支持`uniapp vue2`项目、`uniapp vue3`项目。

**提供了完整的`TypeScript`和`JavaScript`支持**，搭配`vscode`+`Volar`可获得完美的**类型支持、语法提示**。

现在市面上的`uniapp`组件库做的已经非常优秀且全面，如：
- `uni-ui`：DCloud官方提供ui库，同时支持`vue2`和`vue3`、组件丰富、支持nvue
- `uview`：支持`vue2`、组件丰富、文档清晰，支持nvue
- `uview plus`：支持`vue3`、组件丰富、文档清晰，支持nvue
- ...

**`h-uni`并不适合作为项目的主力，更适合做一个功能补充的库**


## 安装

### npm方式安装

**1. 安装依赖包**

运行以下命令安装`h-uni`：

::: code-group
```shell [yarn]
yarn add h-uni
```

```shell [npm]
npm install h-uni
```
:::

安装成功后运行以下命令来查看版本以查看是否安装成功：

::: code-group
```shell [yarn]
yarn h-uni
```

```shell [npm]
npm run h-uni
```
:::

如果您看到了正确的版本号证明已经成功安装


**2. 安装 `SCSS`**

`h-uni`内的组件依赖`SCSS`，您必须要安装此插件，否则无法正常运行。

::: code-group
```shell [yarn]
yarn add sass -D
```

```shell [npm]
npm install sass-loader -D
```
:::

**3. 在项目中配置**

根据项目类型选择一下配置方式

- [vue2项目配置](#vue2项目配置)
- [vue3项目配置](#vue3项目配置)

### HBuilderX方式安装
已经提上日程，最晚2099年前支持

## vue2项目配置

### 挂载主库

```js{4,6}
// main.js
import Vue from "vue";
import App from "./App.vue";
import Huni from 'h-uni/dist/for-vue2'

Vue.use(Huni)
new Vue(App).$mount();
```
在组件内可使用`this.$h`随时随地的访问`h-uni`全部工具

### 配置`easycom`组件模式

此配置需要在项目src目录的pages.json中进行，您可以依据您的组件使用习惯,选择不同的配置：

- **横线分隔命名的组件(kebab-case)**

使用: `"^h-(.*)": "h-uni/dist/for-vue2/components+/h-$1/h-$1.vue"`

- **首字母大写命名的组件(PascalCase)**

使用: `"^H(.*)": "h-uni/dist/for-vue2/components/H$1/H$1.vue"`


```json
// pages.json
{
	"easycom": {
      // kebab-case
      "^h-(.*)": "h-uni/dist/for-vue2/components+/h-$1/h-$1.vue"
      // PascalCase
      // "^H(.*)": "h-uni/dist/for-vue2/components/H$1/H$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

::: tip 温馨提示
1.uni-app为了调试性能的原因，修改easycom规则不会实时生效，配置完后，您需要重启HX或者重新编译项目才能正常使用`h-uni`的功能。

2.您可以同时使用两种模式，不建议这样做，因为可以会有命名冲突的问题

3.如果您是`vue-cli`模式的项目，还需要在项目根目录的`vue.config.js`文件中进行如下配置：

```js
// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['h-uni']
}
```
:::


### 获得语法提示(VSCode+Volar)

- **安装 Volar**

`VSCode`+`Volar`可以在编辑vue代码时获得完整的`Vue语法提示`、`模板内组件属性事件提示`、`代码高亮`、`代码格式化`、`分割左右屏幕`...

`Vue2`项目使用`Volar`插件需要特殊处理，详见：[Volar文档](https://github.com/vuejs/language-tools/tree/master/packages/vscode-vue#usage) 中`Setup for Vue 2`章节

::: tip `vue2`+`Volar` 闭坑指南
1. `vue`版本低于2.7的需要安装`@vue/runtime-dom`（注意使用最新版），才可以使用`defineComponent`编写vue组件，以获得`Volar`支持。
2. 如果是`TypeScript`项目还要确保`TypeScript`也为最新版。
:::

- **获得全局 组件/工具 类型支持**

 在项目根目录的`jsconfig.json`或者``tsconfig.json``文件中`compilerOptions.types`字段中增加全局需要的类型声明文件目录:`h-uni/dist/for-vue2/global.d.ts`
 ```jsonc
 /// jsconfig.json
 {
   "compilerOptions": {
     "types": [
        //...
        "h-uni/dist/for-vue2/global.d.ts",
        //...
     ]
   }
 }
 ```

### HBuilderX支持
已经提上日程，最晚2099年之前支持

## vue3项目配置

### 挂载主库

```js{4,8}
// main.js
import { createSSRApp } from 'vue';
import App from './App.vue';
import Huni from 'h-uni/dist/for-vue3'

export function createApp() {
  const app = createSSRApp(App);
  app.use(Huni)
  return {
    app,
  };
};
```
在组件内可使用`this.$h`随时随地的访问`h-uni`全部工具


### 配置easycom组件模式

此配置需要在项目src目录的pages.json中进行，您可以依据您的组件使用习惯,选择不同的配置：

- **横线分隔命名的组件(kebab-case)**

使用: `"^h-(.*)": "h-uni/dist/for-vue3/components+/h-$1/h-$1.vue"`

- **首字母大写命名的组件(PascalCase)**

使用: `"^H(.*)": "h-uni/dist/for-vue3/components/H$1/H$1.vue"`


```json
// pages.json
{
	"easycom": {
      // kebab-case
      "^h-(.*)": "h-uni/dist/for-vue3/components+/h-$1/h-$1.vue"
      // PascalCase
      // "^H(.*)": "h-uni/dist/for-vue3/components/H$1/H$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

::: tip 温馨提示

您可以同时使用两种模式，不建议这样做，因为可以会有命名冲突的问题

:::

### 获得语法提示(VSCode+Volar)

- **安装 `Volar`**

`VSCode`+`Volar`可以在编辑vue代码时获得完整的`Vue语法提示`、`模板内组件属性事件提示`、`代码高亮`、`代码格式化`、`分割左右屏幕`...

- **获得全局 组件/工具 类型支持**

 在项目根目录的`jsconfig.json`或者``tsconfig.json``文件中`compilerOptions.types`字段中增加全局需要的类型声明文件目录:`h-uni/dist/for-vue3/globa.d.ts`
 ```jsonc
 /// jsconfig.json
 {
   "compilerOptions": {
     "types": [
        //...
        "h-uni/dist/for-vue2/globa.d.ts",
        //...
     ]
   }
 }
 ```

### HBuilderX支持
已经提上日程，最晚2099年之前支持
