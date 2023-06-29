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

## 注册 for-vue2

### 全局注册

**1.在项目的`main.js`中导入`Huni`,并使用`Vue`的`use`方法安装**

```js
// main.js
import Huni from "h-uni/dist/for-vue2";
import Vue from "vue";
import App from "./App.vue";

Vue.use(Huni);

const app = new Vue({
  ...App,
});
app.$mount();
```

::: info 全局方法的访问

这一步成功把`Huni`的全部方法挂载到`this.$h`和`uni.$h`

使用`this.$h`或者`uni.$h`访问`h-uni`方法

:::

**2.配置easycom组件模式**

此配置需要在项目src目录的pages.json中进行。


```json
// pages.json
{
	"easycom": {
      "^H(.*)": "h-uni/dist/for-vue2/components/H$1/H$1.vue",
      "^h-(.*)": "h-uni/dist/for-vue2/components+/h-$1/h-$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

::: info 温馨提示
1.uni-app为了调试性能的原因，修改easycom规则不会实时生效，配置完后，您需要重启HX或者重新编译项目才能正常使用uView的功能。

2.请确保您的pages.json中只有一个easycom字段，否则请自行合并多个引入规则。
:::

**3. Cli模式额外配置**

如果您是`vue-cli`模式的项目，还需要在项目`根目录`的`vue.config.js`文件中进行如下配置：

```js
// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['h-uni']
}
```

### 按需导入

#### 导入组件

`h-uni`组件位置:`h-uni/dist/for-vue2/components`

```vue
<template>
  <view>
    <HButton></HButton>
  </view>
</template>

<script>
import { Hbutton } from 'h-uni/dist/for-vue2/components'
export default {
  components:{ Hbutton },
};
</script>
```

#### 导入工具

`h-uni`工具位置:`h-uni/dist/for-vue2/utils`

```js
import { Hhttp } from 'h-uni/dist/for-vue2/utils'

const request=new Hhttp({
  baseUrl:'https://xxxxxx.xx'
})
```
::: warning 特殊工具以及组件
某些工具以及组件因为其导入使用方式特殊性可能会有所不同，以`相关文档`为准
:::

## 使用 for-vue3

等待更新。。。

