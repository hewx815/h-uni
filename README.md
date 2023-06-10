---
aside: false
---

# h-uni

## 介绍

homepage: https://h-uni.hewxing.cn

github: https://github.com/hewx815/h-uni

内含各种 uniapp 的组件库、工具库，您可以根据需要按需导入,或者直接去[github](https://github.com/hewx815/h-uni)复制代码

## 安装

运行以下命令：

::: code-group

```shell[yarn]
yarn add h-uni
```

```shell[npm]
npm install h-uni
```

:::

安装成功后运行以下命令来查看版本以查看是否安装成功：

::: code-group

```shell[yarn]
yarn h-uni
```

```shell[npm]
npm run h-uni
```

:::

如果您看到了正确的版本号证明已经成功安装

## 使用 for-vue2

### 全局注册

注册全局组件以及挂载全部方法

```js
// main.js
import Huni from "h-uni/for-vue2";
import Vue from "vue";
import App from "./App.vue";

Vue.use(Huni);

const app = new Vue({
  ...App,
});
app.$mount();
```

::: info 全局方法的访问
在组件内通过`this.$h`访问`h-uni`方法
:::

### 按需导入

#### 导入组件

`h-uni`组件位置:`h-uni/for-vue2/components`

```vue
<template>
  <view>
    <HButton></HButton>
  </view>
</template>

<script>
import { Hbutton } from 'h-uni/for-vue2/components'
export default {
  components:{ Hbutton },
};
</script>
```

#### 导入工具

`h-uni`工具位置:`h-uni/for-vue2/utils`

```js
import { Hhttp } from 'h-uni/for-vue2/utils'

const request=new Hhttp({
  baseUrl:'https://xxxxxx.xx'
})
```
::: warning 特殊工具
某些工具因为其导入使用方式特殊性可能会有所不同，以[工具相关文档](/for-vue2/utils/Hhttp.html)为准
:::

## 使用 for-vue3

等待更新。。。

