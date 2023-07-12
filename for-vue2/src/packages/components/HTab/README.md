
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
import { HTab, HTabItem } from 'h-uni/dist/for-vue2/components'
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

##  Props
<PropsTable/>

##  Events

##  Slot

## Item Props

## Item Events

## Item Slot



