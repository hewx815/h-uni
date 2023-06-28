---
outline: 'deep'
---

# cssConverter(样式转换器)

## 介绍
这是一个工具函数

实现：`短横线命名的css字符串` 和 `驼峰命名的css对象` 之间进行互相转换

## 兼容性

<SupportTable  H5  VUE2 />

## 安装

### 使用全局挂载的方法
参考:[全局安装](/README.html#全局注册)
```js
const cssConverter = this.$h.cssConverter;
```

### 按需导入
```js
import cssConverter from 'h-uni/dist/for-vue2/util/cssConverter';
```

## 使用

`cssConverter`通过判断参数`数据类型`，决定是`字符串=>对象` 或者 `对象转=>符串`
### `字符串` => `对象`
```js
const css = 'background-color:#000;color:#fff;';
const cssObj =  this.$h.cssConverter(css);
console.log(cssObj);
// {backgroundColor:'#000',color:'#fff'}
```

### `对象` => `字符串`
```js
const cssObj = { backgroundColor:'#000',color:'#fff'};
const css =  this.$h.cssConverter(css);
console.log(css);
// background-color:#000;color:#fff;
```
