---
outline: 'deep'
---

## Hhttp

### 示例


```js
import Hhttp from 'h-uni/utils/Hhttp';
const hhttp = new Hhttp
{{ $frontmatter.title }}

// 异步方式
hhttp.get('https://xxx.com', { name: 张三 })
    .then(res => {

        console.log(res)
    })
    .catch(err => {
        console, log(err)
    })

//同步方式
async function request(){
    try {
        const res = await hhttp.get('https://xxx.com', { name: 张三 })
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}
```

### 实例方法

`get` :hhttp.get(url[, data[, config]])

`post`:同上

`put`：同上

`connect`：同上

`options`:同上

`trace`:同上

`request`hhttp.request(config)

### 请求配置

```js
//base配置规则
this.base = {
        url: config.url || '',
        method: config.method || 'GET',
        data: config.data || {},
        header: config.header || {},
        timeout: config.timeout || 5000,
    }
```



```js
//request.js
import Hhttp from 'uni-h-http'
const hhttp = new Hhttp

//baseURL
hhttp.base.url = 'https://xxx.com'
//timeout
hhttp.base.timeout = 5000

export default hhttp
```



### 拦截器


#### 请求拦截器
```js
//request.js
import Hhttp from 'uni-h-http'
const hhttp = new Hhttp
//请求拦截器
hhttp.interceptor.request = async function(req){
    // 在发送请求之前做些什么
    return req
    // 中断该请求并报错
    return Promise.reject(err);
    // 做出异步请求
    function reqHandingFn= req=>{
        return New Promise((resolve, reject) => {
       		   setTimeout(()=>{
                req.name = '李四'
            	resolve(req)
        	},2000)
    	})
    }
   const req= await reqHandingFn(req)
   return req
}
```
#### 响应拦截器
```js
//响应拦截器
hhttp.interceptor.response = async function(res){
    // 对响应数据做点什么
    return res
    // 中断该请求并报错
    return Promise.reject(err);
    // 做出异步响应
    function resHandingFn= res=>{
        return New Promise((resolve, reject) => {
       		   setTimeout(()=>{
                res.age = 18
            	resolve(res)
        	},2000)
    	})
    }
   const req= await resHandingFn(res)
   return req
}
```

