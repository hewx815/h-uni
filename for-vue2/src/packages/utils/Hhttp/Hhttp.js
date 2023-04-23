// eslint-disable-next-line func-names
const Hhttp = function (config = {
  url: null,
  method: null,
  data: null,
  header: null,
  timeout: null,
}) {
  this.base = {
    url: config.url || '',
    method: config.method || 'GET',
    data: config.data || {},
    header: config.header || {},
    timeout: config.timeout || 5000,
  };
};
// eslint-disable-next-line func-names
const error = function (where, description, context) {
  // eslint-disable-next-line no-console
  console.error(`[hhttp 错误]:
  [错误位置]:${where}
  [错误描述]:${description}
  [错误信息]:`, context);
  throw new Error('[hhttp warn]');
};
// eslint-disable-next-line func-names, consistent-return
Hhttp.prototype.request = async function (config) {
  try {
    if (!this.base.url && !config.url) {
      error('requset', '缺少url参数', config);
    }
    const requset = {
      url: this.base.url + config.url || '',
      method: config.method || this.base.method,
      data: { ...this.base.data, ...config.data },
      header: { ...this.base.header, ...config.header },
      timeout: config.timeout || this.base.timeout,
    };

    const { interceptor } = this;
    try {
      const req = await interceptor.request(requset);
      if (!req) { error('请求拦截器', '请求拦截器未返回请求体', interceptor.request); }
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line func-names
        const responseHanding = async function (_res, isErr) {
          try {
            const res = await interceptor.response(_res, req, isErr);
            resolve(res);
          } catch (err) {
            reject(err);
            error('响应拦截器', err, _res);
          }
        };
        uni.request({
          ...req,
          success(res) { responseHanding(res, false); },
          fail(err) { responseHanding(err, true); },
        });
      });
    } catch (err) {
      error('请求拦截器', err, requset);
    }
  } catch (e) {
    error('request', e, e);
  }
};

Hhttp.prototype.interceptor = {
  request(req) {
    return req;
  },
  response(res, req, isErr) {
    return !isErr ? res : error('内置响应拦截器', res, res);
  },
};
// eslint-disable-next-line func-names
const methodHanding = function (method) {
  // eslint-disable-next-line func-names, consistent-return
  return function (url, data, config) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const _config = {
        url,
        method,
        data: data || null,
        header: null,
        timeout: null,
      };
      if (config) {
        _config.url = config.url ? config.url : _config.url;
        _config.method = config.method ? config.method : _config.method;
        _config.data = config.data ? config.data : _config.data;
        _config.header = config.header ? config.header : _config.header;
        _config.timeout = config.timeout ? config.timeout : _config.timeout;
      }
      return this.request(_config);
    } catch (err) {
      error('methodHanding', err, err);
    }
  };
};
Hhttp.prototype.get = methodHanding('GET');
Hhttp.prototype.post = methodHanding('POST');
Hhttp.prototype.put = methodHanding('PUT');
Hhttp.prototype.connect = methodHanding('CONNECT');
Hhttp.prototype.options = methodHanding('OPTIONS');
Hhttp.prototype.trace = methodHanding('TRACE');
export default Hhttp;
