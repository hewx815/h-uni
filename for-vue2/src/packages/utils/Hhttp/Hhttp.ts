type RequestInfo = {
  config: any;
  request: any;
  response: any,
  errMeaasge: any,
};
export default class Hhttp {
  // 实例属性
  baseUrl = null as string | null;
  baseHeader = null as Record<string, any> | null;
  baseMethod = null as UniNamespace.RequestOptions['method'] | null;
  baseData = null as UniNamespace.RequestOptions['data'] | null;
  baseTimeout = null as number | null;
  interceptor = {
    request: null as ((config: any) => Promise<RequestInfo>) | null,
    response: null as ((config: any) => Promise<RequestInfo>) | null,
  };

  // 配置实例
  constructor(options: {
    baseUrl: string | null;
    baseHeader: Record<string, any> | null;
    baseMethod: UniNamespace.RequestOptions['method'] | null;
    baseData: UniNamespace.RequestOptions['data'] | null;
    baseTimeout: number | null;
    interceptor: {
      request: (() => Promise<RequestInfo>) | null,
      response: (() => Promise<RequestInfo>) | null,
    };
  }) {
    this.baseUrl = options ? options.baseUrl || null : null;

    this.baseData = options ? options.baseData || null : null;

    this.baseHeader = options ? options.baseHeader || null : null;

    this.baseMethod = options ? options.baseMethod || null : null;

    this.baseTimeout = options ? options.baseTimeout || null : null;

    // eslint-disable-next-line no-nested-ternary
    this.interceptor.request = options ? options.interceptor ? options.interceptor.request || null : null : null;

    // eslint-disable-next-line no-nested-ternary
    this.interceptor.response = options ? options.interceptor ? options.interceptor.response || null : null : null;
  }

  // 请求配置策略
  static getUrl = (baseUrl: any, url = '') => {
    if (!baseUrl) return url;
    const base = baseUrl.replace(/\/+$/, ''); // 去掉baseUrl末尾的斜杠
    const path = url.replace(/^\/+/, ''); // 去掉url开头的斜杠
    return `${base}/${path}`;
  };

  static getHeader = (baseHeader: any, header = {}) => ({ ...baseHeader, ...header });

  static getMethod = (baseMethod: any, method: any) => (method || baseMethod || 'GET');

  static getDate = (baseData: any, data = {}) => ({ ...baseData, ...data });

  static getTimeout = (baseTimeout: any, timeout: any) => (timeout || baseTimeout || 5000);

  // 获取请求配置
  static getRequest = (baseConfig: any, useConfig: any) => ({

    url: Hhttp.getUrl(baseConfig.baseUrl, useConfig.url),

    header: Hhttp.getHeader(baseConfig.baseHeader, useConfig.header),

    method: Hhttp.getMethod(baseConfig.baseMethod, useConfig.method),

    data: Hhttp.getDate(baseConfig.baseData, useConfig.data),

    timeout: Hhttp.getTimeout(baseConfig.baseTimeout, useConfig.timeout),

  });

  // 获取 baseConfig
  static getBaseConfig = (this_: any) => this_;

  // 获取 useConfig
  static getUseConfig = (args: any) => {
    if (args.length === 1 && args[0]) { // 调用方式1
      return args[0];
    }

    if (args.length === 3) { // 调用方式2
      return {
        url: args[1],
        header: null,
        method: args[0],
        data: args[2],
        timeout: null,
      };
    }
    return {};
  };

  // uni.request Promise
  static uniRequestPromise = (uniConfig: any) => new Promise((resolve, reject) => {
    uni.request({
      ...uniConfig,
      success(res: any) {
        resolve(res);
      },
      fail(err: any) {
        reject(err);
      },
    });
  });

  // 请求主函数
  async request(...args: any) {
    let info: RequestInfo = {
      config: this as any,
      request: null as any,
      response: null as any | (() => Promise<any>),
      errMeaasge: null as any | (() => Promise<any>),
    };

    // 获取请求体
    try {
      const baseConfig = Hhttp.getBaseConfig(args);
      const useConfig = Hhttp.getUseConfig(arguments);
      info.request = Hhttp.getRequest(baseConfig, useConfig);
    } catch (err) {
      info.errMeaasge = '配置错误';
      return Promise.reject(info);
    }

    // 请求拦截器
    if (this.interceptor.request) {
      try {
        info = await this.interceptor.request(info);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        info.errMeaasge = '请求拦截器错误';
        return Promise.reject(info);
      }
    }

    // 发起请求
    try {
      info.response = await Hhttp.uniRequestPromise(info.request);
    } catch (err) {
      info.response = err;
      info.errMeaasge = '请求失败';
    }

    // 响应拦截器
    if (this.interceptor.response) {
      try {
        info = await this.interceptor.response(info);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        info.errMeaasge = '响应拦截器错误';
        return Promise.reject(info);
      }
    }

    return Promise.resolve(info);
  }



  // 快捷方法
  get(url: any, data: any) {
    return this.request('GET', url, data);
  }

  post(url: any, data: any) {
    return this.request('POST', url, data);
  }

  put(url: any, data: any) {
    return this.request('PUT', url, data);
  }

  delete(url: any, data: any) {
    return this.request('DELETE', url, data);
  }

  connect(url: any, data: any) {
    return this.request('CONNECT', url, data);
  }

  head(url: any, data: any) {
    return this.request('HEAD', url, data);
  }

  option(url: any, data: any) {
    return this.request('OPTIONS', url, data);
  }

  trace(url: any, data: any) {
    return this.request('TRACE', url, data);
  }
}
