---
outline: deep
---

# TypeHelper

## 介绍

`TypeHelper` 提供了 `uni-app` 基本组件类型、基于`Volar`插件的组件语法提示功能

## 安装

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

如果您看到了 h-uni 的提示，证明 h-uni 已正确安装到您的项目中

如果没有，请移步至：[h-uni 安装](/README.html#安装)

**2. 导入`TypeHelper`的类型文件**

在你项目的`jsconfig.json`或者`tsconfig.json`文件中，`compilerOptions.types`字段内加入`TypeHelper`的类型文件

类型文件位置:`h-uni/for-vue2/dist/plugins/TypeHelper/index.d.ts`

```jsonc{9}
{
  // ...其他配置
  "compilerOptions": {
    // ...其他配置
    "types": [
      "webpack-env",
      "@dcloudio/types",
      "@vue/runtime-dom",
      "h-uni/for-vue2/dist/global.d.ts",
      "h-uni/for-vue2/dist/plugins/TypeHelper/index.d.ts"
    ],
  },
  "vueCompilerOptions": {
    "target": 2 //volar vue2配置
  }
}
```
