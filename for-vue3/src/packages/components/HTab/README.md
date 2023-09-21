---
outline: deep
---

<!-- 此文件仅展示与文档内容与 Vue2 版本 的差异 -->

<Preview path="preview-vue3/#/pages/HTab/HTab"/>

# HTab 标签栏

## 介绍

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{11,17}-->

## 兼容性

<SupportTable  H5 />

## 使用

### 基础用法

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{27,29}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabBase"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabBase.vue#template {3-10 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabBase.vue#script {4 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabBase.vue#style {vue} [style]
:::

### 布局方向

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{41,44}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabDirection"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabDirection.vue#template {7,10,14,17,24,30 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabDirection.vue#script {5-7,9-13 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabDirection.vue#style {vue} [style]
:::

### 滑块样式

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{56,66}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabActiveStyle"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabActiveStyle.vue#template {9-13,22-27,36-41,51-57,66-72,87-92,106-111,125-136 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabActiveStyle.vue#script {4 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabActiveStyle.vue#style {vue} [style]
:::

### 选项卡样式

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{78,82}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabItemStyle"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabItemStyle.vue#template {18-24,41-47,63-69,84-85,100-101 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabItemStyle.vue#script {4-8 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabItemStyle.vue#style {vue} [style]
:::

### 使用插槽

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{94,96}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabSlots"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabSlots.vue#template {7-47,54-70,77-86 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabSlots.vue#script {4-6 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabSlots.vue#style {vue} [style]
:::

### 关闭动画或滚动

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{108,111}-->

<PreviewBtn path="preview-vue3/#/pages/HTab/HTabStop"/>

::: code-group
<<< @/for-vue3/src/pages/HTab/HTabStop.vue#template {9,26,43,60 vue} [template]
<<< @/for-vue3/src/pages/HTab/HTabStop.vue#script {4 vue} [script]
<<< @/for-vue3/src/pages/HTab/HTabStop.vue#style {vue} [style]
:::

<!--@include: @/for-vue2/src/packages/components/HTab/README.md{121,124}-->
| modeValue/v-model         | 当前选中`HTabItem`所绑定的值 | `string` `number` `boolean` |               -               |       -        |
<!--@include: @/for-vue2/src/packages/components/HTab/README.md{126,141}-->
| updata:modelValue  | 选中`HTabItem`改变事件 | 选中`HTabItem`所绑定的`value` |
<!--@include: @/for-vue2/src/packages/components/HTab/README.md{143,}-->
