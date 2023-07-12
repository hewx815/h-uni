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

### 布局方向

<PreviewBtn path="pages/HTab/HTabBase"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HabDirection.vue#template {17-29 vue} [template]
<<< @/for-vue2/src/pages/HTab/HabDirection.vue#script {5-7 vue} [script]
<<< @/for-vue2/src/pages/HTab/HabDirection.vue#style {vue} [style]
:::


## Props

|     属性名     |                描述                 |            类型             |        可选值         |    默认值     |
| :------------: | :---------------------------------: | :-------------------------: | :-------------------: | :-----------: |
| value/v-model  | 当前选中`HTabItem`所绑定的 value 值 | `String`,`Number`,`Boolean` |           -           |       -       |
|   direction    |            标签栏的方向             |          `String`           |          x,y          |       y       |
|     width      |            标签栏的宽度             |      `String`,`Number`      |           -           | 100vw/150rpx  |
|     height     |            标签栏的高度             |      `String`,`Number`      |           -           | 150rpx/600rpx |
| activeDuration |        滑块过渡时间(单位:ms)        |          `Number`           |           -           |      500      |
|  activeAspect  |             滑块的朝向              |          `String`           | left,right,top,bottom |     left      |
|  activeStyle   |             滑块的样式              |      `String`,`Object`      |           -           |       -       |
## Events

| 事件名 |          描述          |             参数              |
| :----: | :--------------------: | :---------------------------: |
| input  | 选中`HTabItem`改变事件 | 选中`HTabItem`所绑定的`value` |

## Slot

| 插槽名  |          描述          |                        插槽属性                        |
| :-----: | :--------------------: | :----------------------------------------------------: |
| default | 需要包含`HTabItem`组件 |                           -                            |
| active  |       自定义滑块       | `left`,`top`,`width`,`height` 原生滑块布局信息(单位px) |

## Item Props

|   属性名    |         描述         |            类型             | 可选值 | 默认值 |
| :---------: | :------------------: | :-------------------------: | :----: | :----: |
|    value    |        绑定值        | `String`,`Number`,`Boolean` |   -    |   -    |
|  direction  | 图片和文本的排列方向 |          `String`           | x , y  |   y    |
|    label    |      显示的文本      |          `String`           |   -    |   -    |
|    image    |       图片链接       |          `String`           |   -    |   -    |
|   styles    |     选项卡的样式     |      `String`,`Object`      |   -    |   -    |
| activeImage |   选中后的图片链接   |          `String`           |   -    |   -    |
| activeLabel |     选中后的文本     |          `String`           |   -    |   -    |
| activeStyle |  选中后选项卡的样式  |      `String`,`Object`      |   -    |   -    |

## Item Events

| 事件名 | 描述  | 参数  |
| :----: | :---: | :---: |
|   -    |   -   |   -   |

## Item Slot

| 插槽名  |     描述     | 插槽属性 |
| :-----: | :----------: | :------: |
| default | 自定义选项卡 |    -     |
