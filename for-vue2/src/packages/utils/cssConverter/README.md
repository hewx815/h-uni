# cssConverter 样式转换器

## 介绍
这是一个工具函数

实现：`短横线命名的css字符串` 和 `驼峰命名的css对象` 之间进行互相转换

## 兼容性

<SupportTable  H5  WEIXIN/>

## 安装

### 使用全局挂载的方法

参考:[全局安装](/README.html#全局注册)

```js
const { cssConverter } = this.$h;
// 或者
const { cssConverter } = uni.$h;
```

### 按需导入
```js
import { cssConverter } from 'h-uni/dist/for-vue2/utils';
```

## 参数 && 返回值

**cssConverter(value [, target = 'string'])**
### value

- **类型:** `String || Object`

可以是字`短横线命名的css字符串` 和 `驼峰命名的css对象`

### target

- **类型:** `['string', 'object']`

- **默认:** `'string'`

指定返回的类型

`'string'`: 返回`短横线命名的css字符串`

`'object'`: 返回`驼峰命名的css对象`


## 示例

### `字符串` => `对象`
```js
const css = 'background-color:#000;color:#fff;';

const cssObj =  this.$h.cssConverter(css,'object');

console.log(cssObj);
// {backgroundColor:'#000',color:'#fff'}
```

### `对象` => `字符串`
```js
const cssObj = {
  backgroundColor:'#000',
  color:'#fff',
};

const css =  this.$h.cssConverter(cssObj);

console.log(css);
// background-color:#000;color:#fff;
```
