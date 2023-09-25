---
outline: deep
---

# cssConverter 样式转换器

## 介绍
这是一个工具函数

实现：`短横线命名的css字符串` 和 `驼峰命名的css对象` 之间进行互相转换

## 兼容性

<SupportTable  H5  WEIXIN TOUTIAO BAIDU ALIPAY LARK/>

## 类型

```ts
function cssConverter(
  value?:string | CSSPropertie,
  target?:'string' | 'object' = 'string'
):string | CSSPropertie
```
## 说明

- **value**

参数 `value` 可以是 **短横线命名的css字符串** 或 **驼峰命名的css对象**

- **target**

根据参数 `target` 的值，指定以以何种模式转换：（默认：`'string'`）

`'string'`: 返回`短横线命名的css字符串{string}`

`'object'`: 返回`驼峰命名的css对象{CSSPropertie}`

- **返回值**

参数`target` 的值决定了`cssConverter` 返回值，导致在`Typescript`中无法获得准确的类型

如需要获得准确的类型，应该使用 [cssconverterString](#cssconverterstring) 或 [cssConverterObject](#cssconverterobject)

## 示例

 字符串 转 对象：

```ts
const css = 'background-color:#000;color:#fff;';

const cssObj = cssConverter(css,'object');

console.log(cssObj); // {backgroundColor:'#000',color:'#fff'}
```

 对象 转 字符串：

```ts
const cssObj = { backgroundColor:'#000', color:'#fff' };

const css =  cssConverter(cssObj); // 不需要第二个参数，第二个参数默认为`string`

console.log(css); // 'background-color:#000;color:#fff;'
```

## cssConverterString

将 `短横线命名的css字符串` 或 `驼峰命名的css对象` 转换成 `短横线命名的css字符串`

- **类型**

```ts
function cssConverterString(value?: string | CSSProperties): string
```

- **示例**

```ts
const s0 = cssConverterString({ backgroundColor:'#000', color:'#fff' })
const s1 = cssConverterString('background-color:#000;color:#fff;')
// s0:'background-color:#000;color:#fff;'
// s1:'background-color:#000;color:#fff;'
```

## cssConverterObject

将 `短横线命名的css字符串` 或 `驼峰命名的css对象` 转换成 `驼峰命名的css对象`

- **类型**

```ts
function cssConverterObject(value?: string | CSSProperties): CSSProperties
```

- **示例**
```ts
const s0 = cssConverterObject({ backgroundColor:'#000', color:'#fff' })
const s1 = cssConverterObject('background-color:#000;color:#fff;')
// s0:{ backgroundColor:'#000', color:'#fff' }
// s1:{ backgroundColor:'#000', color:'#fff' }
```
