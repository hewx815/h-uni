<Preview path="pages/HTab/HTab"/>

# HTab 标签栏

## 介绍

## 兼容性

<SupportTable  H5  WEIXIN/>

## 安装

### 使用全局公共组件

参考:[全局安装](/README.html#全局注册)

### 按需导入

`HTab` 依赖于 `HTabItem`,因此你需要同时导入两个组件

```vue
<script>
import { HTab, HTabItem } from "h-uni/dist/for-vue2/components";
</script>
```

## 使用

### 基础用法

1. 在`HTab`内嵌套`HTabItem`
2. 为`HTabItem`绑定`value`和`label`值
3. `HTab`通过`v-model`绑定变量，即可获取当前选中`HTabItem`的`value`

<PreviewBtn path="pages/HTab/HTabBase"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#template {3-10 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#script {5 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#style {vue} [style]
:::

### 横向布局

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#template {3-10 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#script {5 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#style {vue} [style]
:::


## Props

|    属性名     |                描述                 |            类型             |        可选值         | 默认值 |
| :-----------: | :---------------------------------: | :-------------------------: | :-------------------: | :----: |
| value/v-model | 当前选中`HTabItem`所绑定的 value 值 | `String` `Number` `Boolean` |           -           |   -    |
|   direction   |            标签栏的方向             |          `String`           | x:水平方向,y:垂直方向 |   y    |
|     width     |            标签栏的宽度             |      `String` `Number`      |           -           | 100vw  |
|    height     |            标签栏的高度             |      `String` `Number`      |           -           | 150rpx |
|   duration    |            滑块过渡时间             |          `Number`           |           -           |  500   |
|  activeStyle  |             滑块的样式              |      `String` `Object`      |           -           |   -    |

## Events

| 事件名 |          描述          |             参数              |
| :----: | :--------------------: | :---------------------------: |
| value  | 选中`HTabItem`改变事件 | 选中`HTabItem`所绑定的`value` |

## Slot

| 插槽名 | 描述  | 插槽属性 |
| :----: | :---: | :------: |
|        |       |          |

## Item Props

|   属性名   | 描述  | 类型  | 可选值 | 默认值 |
| :--------: | :---: | :---: | :----: | :----: |
|   value    |       |       |        |        |
|   label    |       |       |        |        |
| direction  |       |       |        |        |
|    icon    |       |       |        |        |
| activeIcon |       |       |        |        |

## Item Events

| 事件名 | 描述  | 参数  |
| :----: | :---: | :---: |
|        |       |       |

## Item Slot

| 插槽名 | 描述  | 插槽属性 |
| :----: | :---: | :------: |
|        |       |          |
