---
outline: deep
---

<Preview path="pages/HTab/HTab"/>

# HTab 标签栏

## 介绍

此组件，是一个 tabs 标签组件，具有**自动滚动**，**滑块自动滑动**等功能

并且支持**垂直布局**，**水平布局**，因此此组件可使用的场景非常多：左侧**分类栏**、顶部**标签栏**.....

激活的 tab 会**自动移动**到组件的中间位置，标签少的时候，可以**禁止滑动**。

有丰富的自定义属性，插槽满足**不同的业务需求**

## 兼容性

<SupportTable  H5  WEIXIN TOUTIAO BAIDU ALIPAY LARK/>

## 安装

### 使用全局挂载的方法

- 完成[`h-uni`安装](/README.html#安装)
- 完成[挂载全局组件](/README.html#挂载全局组件)

### 按需导入
- 完成[`h-uni`安装](/README.html#安装)
- 从`h-uni/dist/for-vue2`导入`HTab`

```js
import { HTab, HTabItem } from 'h-uni/dist/for-vue2'
```
## 使用

### 基础用法

在`HTab`内嵌套`HTabItem`,为`HTabItem`绑定`value`和`label`值

`HTab`通过`v-model`绑定变量，即可获取当前选中`HTabItem`的`value`

<PreviewBtn path="pages/HTab/HTabBase"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#template {3-10 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#script {5 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabBase.vue#style {vue} [style]
:::

### 布局方向

- `HTab`属性`direction`决定标签页内选项卡的排列方式
- `HTabItem`属性`direction`决定选项卡内文字和图盘的排列方式：`y` 垂直布局；`x`:水平布局；

下面的示例中:通过两个单选按钮组控制`HTab`和`HTabItem`组件的`direction`

<PreviewBtn path="pages/HTab/HTabDirection"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabDirection.vue#template {7,10,14,17,24 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabDirection.vue#script {6-7,24-25 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabDirection.vue#style {vue} [style]
:::

### 滑块样式

- `activeAspect`更改滑块的朝向,你可以根据实际内容位置和标签栏的布局更改滑块的开口方向,可选值：`none`,`left`, `right`, `top`, `bottom`

- `activeDurations`设置滑块过渡时间(单位:ms)
- `activeBackgroundColor`设置滑块的背景颜色
- `activeStyle`用于自定义滑块的样式

此外，你还可以使用具名插槽`active`用来自定义滑块的内容

::: warning 滑块背景颜色
当`activeAspect`不为`none`时，使用`activeStyle`设置`background-color`并不完全更改滑块背景颜色，需要使用`activeBackgroundColor`属性进行更改
:::

<PreviewBtn path="pages/HTab/HTabActiveStyle"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabActiveStyle.vue#template {9-13,22-27,36-41,51-57,66-72,87-92,106-111,125-136 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabActiveStyle.vue#script {5 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabActiveStyle.vue#style {vue} [style]
:::

### 选项卡样式

- `styles`和`activeStyle`选项卡和其选中后的样式
- `label`和`activeLabel`选项卡中文本和选中后的文本
- `image`和`activeImage`选项卡中图片链接和其选中后图片链接
- `labelStyle`和`activeLabelStyle`选项卡中文本和其选中后的样式
- `imageStyle`和`activeImageStyle`选项卡中图片和其选中后的样式

<PreviewBtn path="pages/HTab/HTabItemStyle"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabItemStyle.vue#template {18-24,41-47,63-69,84-85,100-101 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabItemStyle.vue#script {13-23 vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabItemStyle.vue#style {vue} [style]
:::

### 使用插槽

- `HTab`默认插槽：标签栏的内容，可以和`HTabItem`穿插使用
- `HTab`具名插槽`active`：自定义滑块的内容
- `HTabItem`默认插槽：不使用属性指定的图片和文本，使用自定义选项卡内容
  <PreviewBtn path="pages/HTab/HTabSlots"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabSlots.vue#template {7-47,54-70,77-86 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabSlots.vue#script {vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabSlots.vue#style {vue} [style]
:::

### 关闭动画或滚动

- `scrollAnimation`：是否开启滚动动画
- `activeAnimation`：是否开启滑块动画
- `scrollCenter`：是否开启选中项自动滚动至中间功能
- `showActive`：是否开启滑块

<PreviewBtn path="pages/HTab/HTabStop"/>

::: code-group
<<< @/for-vue2/src/pages/HTab/HTabStop.vue#template {9,26,43,60 vue} [template]
<<< @/for-vue2/src/pages/HTab/HTabStop.vue#script {vue} [script]
<<< @/for-vue2/src/pages/HTab/HTabStop.vue#style {vue} [style]
:::

## Props

| 属性名                | 描述                                |            类型             |            可选值             |     默认值     |
| :-------------------- | :---------------------------------- | :-------------------------: | :---------------------------: | :------------: |
| value/v-model         | 当前选中`HTabItem`所绑定的 value 值 | `String` `Number` `Boolean` |               -               |       -        |
| direction             | 标签栏的方向                        |          `String`           |              x,y              |       y        |
| width                 | 标签栏的宽度                        |      `String` `Number`      |               -               |  160rpx/100vw  |
| height                | 标签栏的高度                        |      `String` `Number`      |               -               | 1200rpx/160rpx |
| activeAspect          | 滑块的朝向                          |          `String`           | none,left, right, top, bottom |      none      |
| activeDuration        | 滑块过渡时间(单位:ms)               |          `Number`           |               -               |      500       |
| activeBackgroundColor | 滑块的背景颜色                      |          `String`           |               -               |    #FFFFFF     |
| activeStyle           | 滑块的样式                          |      `String` `Object`      |               -               |       -        |
| scrollAnimation       | 是否开启滚动动画                    |          `Boolean`          |               -               |      true      |
| activeAnimation       | 是否开启滑块动画                    |          `Boolean`          |               -               |      true      |
| scrollCenter          | 是否开启选中项自动滚动至中间功能    |          `Boolean`          |               -               |      true      |
| showActive            | 是否开启滑块                        |          `Boolean`          |               -               |      true      |

## Events

| 事件名 | 描述                   |             参数              |
| :----- | :--------------------- | :---------------------------: |
| input  | 选中`HTabItem`改变事件 | 选中`HTabItem`所绑定的`value` |

## Slot

| 插槽名  | 描述                                   | 插槽属性 |
| :------ | :------------------------------------- | :------: |
| default | 标签栏的内容，可以和`HTabItem`穿插使用 |    -     |
| active  | 自定义滑块内容                         |    -     |

## Item Props

| 属性名           | 描述                 |            类型             | 可选值 |    默认值    |
| :--------------- | :------------------- | :-------------------------: | :----: | :----------: |
| value            | 绑定值               | `String` `Number` `Boolean` |   -    |      -       |
| direction        | 图片和文本的排列方向 |          `String`           | x , y  |      y       |
| label            | 文本内容             |          `String`           |   -    |      -       |
| activeLabel      | 选中后的文本内容     |          `String`           |   -    |   `label`    |
| labelStyle       | 文本内容的样式       |      `String` `Object`      |   -    |      -       |
| activeLabelStyle | 选中后文本内容的样式 |      `String` `Object`      |   -    | `labelStyle` |
| image            | 图片链接             |          `String`           |   -    |      -       |
| activeImage      | 选中后的图片链接     |          `String`           |   -    |   `image`    |
| imageStyle       | 图片的样式           |      `String` `Object`      |   -    |      -       |
| activeImageStyle | 选中后的图片的样式   |      `String` `Object`      |   -    | `imageStyle` |
| styles           | 选项卡的样式         |      `String` `Object`      |   -    |      -       |
| activeStyle      | 选中后选项卡的样式   |      `String` `Object`      |   -    |   `styles`   |

## Item Events

| 事件名 | 描述                       | 参数  |
| :----- | :------------------------- | :---: |
| select | 当前选项卡被选中触发的事件 |   -   |

## Item Slot

| 插槽名  | 描述             | 插槽属性 |
| :------ | :--------------- | :------: |
| default | 自定义选项卡内容 |    -     |
