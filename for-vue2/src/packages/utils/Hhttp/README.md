---
outline: deep
---

# Hhttp 网络请求

## 介绍

这是一个基于 [uni.request](https://uniapp.dcloud.net.cn/api/request/request.html#request)
 封装的 [promise](https://javascript.info/promise-basics) 请求库，
 具有实例属性和方法、请求拦截器、响应拦截器等功能。

## 兼容性

<SupportTable WEIXIN H5 ALIPAY BAIDU TOUTIAO LARK/>

## 使用

下面是使用的几种方式示例

#### 方式一 (自定义请求)

使用实例的 [request](/for-vue2/utils/Hhttp.html#实例方法-method) 方法

```js
// 实例化Hhttp
const request = new Hhttp();

// 发起get请求
const { response } = await request.request({
  url: 'https://www.baidu.com/s',
  data: { wd: '哈哈哈' },
  timeout: 5000,
});

// 发起post请求
const { response } = await request.request({
  url: 'https://www.baidu.com/s',
  method: 'POST',
  data: { wd: '哈哈哈' },
  timeout: 7000,
});

// 拿到响应数据
console.log(response);
```

#### 方式二 (快捷请求)

使用实例的 `get` `post` ... [快捷方法](/for-vue2/utils/Hhttp.html#实例方法-method)

```js
// 实例配置
const baseOptions = {
  baseUrl:'https://www.baidu.com',
};

// 实例化Hhttp
const request = new Hhttp(baseOptions);

// 也可以在实例化后配置实例属性
request.baseTimeout = 10000

// 发起get请求
const { response } = await request.get('/s', { wd:'哈哈哈' });

// 发起post请求
const { response } = await request.post('/s', { wd:'哈哈哈' });

// 拿到响应数据
console.log(response);
```

#### 方式三 (同步与异步调用)

同步与异步调用

```js
// 实例化Hhttp
const request = new Hhttp();

// 同步调用
const { response } = await request.get('https://www.baidu.com/s', { wd:'哈哈哈' });
// 拿到响应数据
console.log(response);

// 异步调用
request.post('https://www.baidu.com/s', { wd:'哈哈哈' })
  .then((data) =>{
    // 拿到响应数据
    console.log(data.response);
  })
  .catch((err) =>{
    // 拿到错误信息
    console.log(err);
  })


```

## 实例属性/实例化配置(baseOptions)

`baseUrl`:每次请求都拼接的url

`baseHeader`:每次请求都有的请求头

`baseMethod`:默认的请求方式

`baseData`:每次请求都有的发送数据

`baseTimeout`:默认的超时时间

`interceptor.request`:[请求拦截器](/for-vue2/utils/Hhttp.html#%E6%8B%A6%E6%88%AA%E5%99%A8-interceptors)

`interceptor.request`:[响应拦截器](/for-vue2/utils/Hhttp.html#%E6%8B%A6%E6%88%AA%E5%99%A8-interceptors)

## 实例方法(method)

`request(option)`:使用 配置`option` 发起请求， 详见 [uni.request `OBJECT 参数说明`](https://uniapp.dcloud.net.cn/api/request/request.html#request)

此处使用的配置`option`会继承实例的属性

`get(url[,data])`:GET 快捷请求,`url`:String,`data`:Object

`post(url[,data])`:POST 快捷请求,同上

`put(url[,data])`:PUT 快捷请求,同上

`delete(url[,data])`:DELETE 快捷请求,同上

`connect(url[,data])`:CONNECT 快捷请求,同上

`head(url[,data])`:HEAD 快捷请求,同上

`option(url[,data])`:OPTIONS 快捷请求,同上

`trace(url[,data])`:TRACE 快捷请求,同上


::: warning 实例方法返回值均为 [promise](https://javascript.info/promise-basics)
promise resolve:[`requestInfo`](/for-vue2/utils/Hhttp.html#请求信息-requestinfo)

promise reject:[`requestInfo`](/for-vue2/utils/Hhttp.html#请求信息-requestinfo)
:::

## 拦截器(interceptors)

在请求或响应被 then 或 catch 处理前拦截它们。

拦截器参数:[`requestInfo`](/for-vue2/utils/Hhttp.html#请求信息-requestinfo)

```js
// 添加请求拦截器
request.interceptors.request=(info)=>{
  // 给每一条请求添加 的 header 添加 token
  info.request.header={ ...info.request.header , token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' };
  return info;
};

// 添加响应拦截器
request.interceptors.response=(info)=>{
  if(info.response.statusCode !== 200){
    // 返回失败响应
    return Promise.reject(`请求失败`);
  }else{
    // 返回成功响应
    return info;
  }
};

```

::: tip 获得语法提示

由于拦截器赋值的写法，导致无法正确获得良好的语法提示，可以手动从 `h-uni/dist/for-vue2` 导入工具函数 `defineInterceptor` 以获得语法提示

```js
import { Hhttp , defineInterceptor } from 'h-uni/dist/for-vue2'

const request = new Hhttp({
  interceptor:defineInterceptor({
    request:(info) =>info
    response:(info) => info
  })
})
```
:::

## 请求信息 (requestInfo)

请求对象从调用实例方法开始被创建，最终通过实例方法 promise 返回

**以下位置可以拿到`requestInfo`**

1.实例方法 promise 返回值

2.请求拦截器、响应拦截器参数

**请求不同阶段`requestInfo`会发生变化**

`调用实例方法`=>`请求拦截器`=>`发起请求`=>`响应拦截器`=>`promise 结果`

### 数据结构

`config`:[当前实例](/for-vue2/utils/Hhttp.html#实例属性-实例化配置-baseoptions)

`request`:请求信息

`response`:响应信息

`errMeaasge`:错误信息


