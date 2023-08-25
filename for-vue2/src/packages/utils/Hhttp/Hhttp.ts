/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Hhttp 请求信息
 * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#请求信息-requestinfo
 */
export type RequestInfo = {
  // eslint-disable-next-line no-use-before-define
  config: BaseOptions | typeof Example;
  request: any;
  response:
  | UniNamespace.RequestSuccessCallbackResult
  | UniNamespace.GeneralCallbackResult
  | null;
  errMeaasge: unknown;
};

export type InterceptorFunction = (
  config: RequestInfo
) => Promise<RequestInfo | any> | void;

export const defineInterceptor = (interceptor: {
  /**
   * Hhttp 请求拦截器
   */
  request: InterceptorFunction;
  response: InterceptorFunction;
  /**
   * Hhttp 响应拦截器
   */
}) => interceptor;

export type BaseOptions = {
  baseUrl: UniNamespace.RequestOptions['url'] | null;
  baseHeader: UniNamespace.RequestOptions['header'] | null;
  baseMethod: UniNamespace.RequestOptions['method'] | null;
  baseData: UniNamespace.RequestOptions['data'] | null;
  baseTimeout: UniNamespace.RequestOptions['timeout'] | null;
  interceptor: {
    request: InterceptorFunction | null;
    response: InterceptorFunction | null;
  };
};

export type Options = {
  /**
   * Hhttp 每次请求都拼接的url
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  baseUrl?: UniNamespace.RequestOptions['url'];
  /**
   * Hhttp 每次请求都有的请求头
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  baseHeader?: UniNamespace.RequestOptions['header'];
  /**
   * Hhttp 默认的请求方式
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  baseMethod?: UniNamespace.RequestOptions['method'];
  /**
   * Hhttp 每次请求都发送的数据
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  baseData?: UniNamespace.RequestOptions['data'];
  /**
   * Hhttp 默认的超时时间
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  baseTimeout?: UniNamespace.RequestOptions['timeout'];
  /**
   * Hhttp 拦截器
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#拦截器-interceptors
   */
  interceptor?: {
    /**
     * Hhttp 请求拦截器
     */
    request?: InterceptorFunction;
    /**
     * Hhttp 响应拦截器
     */
    response?: InterceptorFunction;
  };
};

export type UseConfig =
  | UniNamespace.RequestOptions
  | {
    url: UniNamespace.RequestOptions['url'];
    header: null;
    method: UniNamespace.RequestOptions['method'];
    data: UniNamespace.RequestOptions['data'];
    timeout: null;
  }
  | undefined;
/**
 * 这是一个基于 uni.request 封装的 promise 请求库， 具有实例属性和方法、请求拦截器、响应拦截器等功能
 *
 * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp
 */
export default class Hhttp {
  /**
   * Hhttp 每次请求都拼接的url
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  public baseUrl: BaseOptions['baseData'] = null;

  /**
   * Hhttp 每次请求都有的请求头
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  public baseHeader: BaseOptions['baseHeader'] = null;

  /**
   * Hhttp 默认的请求方式
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  public baseMethod: BaseOptions['baseMethod'] = null;

  /**
   * Hhttp 每次请求都发送的数据
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  public baseData: BaseOptions['baseData'] = null;

  /**
   * Hhttp 默认的超时时间
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例属性-实例化配置-baseoptions
   */
  public baseTimeout: BaseOptions['baseTimeout'] = null;

  /**
   * Hhttp 拦截器
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#拦截器-interceptors
   */
  public interceptor: {
    /**
     * Hhttp 请求拦截器
     */
    request: BaseOptions['interceptor']['request'];
    /**
     * Hhttp 响应拦截器
     */
    response: BaseOptions['interceptor']['response'];
  } = {
      request: null,
      response: null,
    };

  // 配置实例
  constructor(options?: Options) {
    this.baseUrl = options ? options.baseUrl || null : null;

    this.baseData = options ? options.baseData || null : null;

    this.baseHeader = options ? options.baseHeader || null : null;

    this.baseMethod = options ? options.baseMethod || null : null;

    this.baseTimeout = options ? options.baseTimeout || null : null;

    this.interceptor.request = options && options.interceptor && options.interceptor.request
      ? options.interceptor.request
      : null;

    this.interceptor.request = options && options.interceptor && options.interceptor.response
      ? options.interceptor.response
      : null;
  }

  // 请求配置策略
  static getUrl = (
    baseUrl: BaseOptions['baseUrl'],
    url: Options['baseUrl'],
  ) => {
    const _baseUrl = baseUrl || '';
    const _url = url || '';

    const base = _baseUrl.replace(/\/+$/, ''); // 去掉baseUrl末尾的斜杠
    const path = _url.replace(/^\/+/, ''); // 去掉url开头的斜杠

    return `${base}/${path}`;
  };

  static getHeader = (
    baseHeader: UniNamespace.RequestOptions['header'] | null,
    header: UniNamespace.RequestOptions['header'] | null,
  ): object | any => {
    if (
      (baseHeader instanceof Object && header instanceof Object)
      || (!baseHeader && header instanceof Object)
      || (baseHeader instanceof Object && !header)
    ) {
      const _baseHeader = baseHeader instanceof Object ? (baseHeader as object) : {};
      const _header = header instanceof Object ? (header as object) : {};
      return { ..._baseHeader, ..._header };
    }
    return header;
  };

  static getMethod = (
    baseMethod: UniNamespace.RequestOptions['method'] | null,
    method: UniNamespace.RequestOptions['method'] | null,
  ) => method || baseMethod || 'GET';

  static getDate = (
    baseData: UniNamespace.RequestOptions['data'] | null,
    data: UniNamespace.RequestOptions['data'] | null,
  ): UniNamespace.RequestOptions['data'] => {
    if (
      (baseData instanceof Object && data instanceof Object)
      || (!baseData && data instanceof Object)
      || (baseData instanceof Object && !data)
    ) {
      const _baseData = baseData instanceof Object ? (baseData as object) : {};
      const _data = data instanceof Object ? (data as object) : {};
      return { ..._baseData, ..._data };
    }

    if (
      (baseData instanceof String && data instanceof String)
      || (!baseData && data instanceof String)
      || (baseData instanceof String && !data)
    ) {
      const _baseData = baseData instanceof String ? (baseData as string) : '';
      const _data = data instanceof String ? (data as string) : '';
      return `${_baseData}${_data}`;
    }

    return data || {};
  };

  static getTimeout = (
    baseTimeout: UniNamespace.RequestOptions['timeout'] | null,
    timeout: UniNamespace.RequestOptions['timeout'] | null,
  ) => timeout || baseTimeout || 5000;

  // 获取请求配置
  static getRequest = (baseConfig: BaseOptions, useConfig: UseConfig) => ({
    url: Hhttp.getUrl(baseConfig.baseUrl, useConfig?.url),

    header: Hhttp.getHeader(baseConfig.baseHeader, useConfig?.header),

    method: Hhttp.getMethod(baseConfig.baseMethod, useConfig?.method),

    data: Hhttp.getDate(baseConfig.baseData, useConfig?.data),

    timeout: Hhttp.getTimeout(baseConfig.baseTimeout, useConfig?.timeout),
  });

  // 获取 baseConfig;
  static getBaseConfig = (this_: BaseOptions): BaseOptions => this_;

  // 获取 useConfig
  static getUseConfig = (args: any): UseConfig => {
    if (args.length === 1 && args[0]) {
      // 调用方式1
      return args[0];
    }

    if (args.length === 3) {
      // 调用方式2
      return {
        url: args[1],
        header: null,
        method: args[0],
        data: args[2],
        timeout: null,
      };
    }
    return undefined;
  };

  // uni.request Promise
  static uniRequestPromise = (
    uniConfig: UniNamespace.RequestOptions,
  ): Promise<
    | UniNamespace.RequestSuccessCallbackResult
    | UniNamespace.GeneralCallbackResult
  > => new Promise((resolve, reject) => {
    uni.request({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      ...uniConfig,
    });
  });

  /**
   * 传递`uni.request`原始参数发起请求
   *
   * `uni.request`原始参数：https://uniapp.dcloud.net.cn/api/request/request.html#request
   * `Hhttp`使用方式：https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  async request(...args: any) {
    let info: RequestInfo = {
      config: this,
      request: null,
      response: null,
      errMeaasge: null,
    };

    // 获取请求体
    try {
      const baseConfig = Hhttp.getBaseConfig(args);
      const useConfig = Hhttp.getUseConfig(args);
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

  /**
   * 发起 GET 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  get(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('GET', url, data);
  }

  /**
   * 发起 POST 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  post(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('POST', url, data);
  }

  /**
   * 发起 PUT 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  put(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('PUT', url, data);
  }

  /**
   * 发起 DELETE 请求
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  delete(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('DELETE', url, data);
  }

  /**
   * 发起 CONNECT 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  connect(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('CONNECT', url, data);
  }

  /**
   * 发起 HEAD 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  head(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('HEAD', url, data);
  }

  /**
   * 发起 OPTIONS 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  option(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('OPTIONS', url, data);
  }

  /**
   * 发起 TRACE 请求
   *
   * https://h-uni.hewxing.cn/for-vue2/utils/Hhttp#实例方法-method
   */
  trace(
    url: UniNamespace.RequestOptions['url'],
    data: UniNamespace.RequestOptions['data'],
  ) {
    return this.request('TRACE', url, data);
  }
}

const Example = new Hhttp();
