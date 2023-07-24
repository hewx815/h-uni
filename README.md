---
aside: left
outline: deep
---

# h-uni

## 介绍

homepage: https://h-uni.hewxing.cn

github: https://github.com/hewx815/h-uni

内含各种 uniapp 的组件库、工具库，您可以根据需要按需导入,或者直接去[github](https://github.com/hewx815/h-uni)复制代码


## 安装

### npm方式安装

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

## 配置

根据你项目所使用的vue版本，选择不同的配置方式：

- [vue2项目配置](#vue2项目配置)<br/>
- [vue3项目配置](#vue3项目配置)

### vue2项目配置

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

::: tip 全局方法的访问

这一步成功把`Huni`的全部方法挂载到`this.$h`和`uni.$h`

使用`this.$h`或者`uni.$h`访问`h-uni`方法

:::

**2.配置easycom组件模式**

此配置需要在项目src目录的pages.json中进行。

您可以依据您的组件使用习惯,选择不同的配置：

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
:::

**3. Cli模式额外配置**

如果您是`vue-cli`模式的项目，还需要在项目`根目录`的`vue.config.js`文件中进行如下配置：

```js
// vue.config.js，如没有此文件则手动创建
module.exports = {
    transpileDependencies: ['h-uni']
}
```

### vue3项目配置

等待更新。。。

