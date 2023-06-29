/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import Vue from 'vue';
import App from './App.vue';
import Huni from './packages/index';

Vue.use(Huni);
Vue.config.productionTip = false;

App.mpType = 'app';

function isPromise(obj) {
  return (
    !!obj
    && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function'
  );
}
uni.addInterceptor({
  returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((_res) => {
        if (_res[0]) {
          reject(_res[0]);
        } else {
          resolve(_res[1]);
        }
      });
    });
  },
});

const app = new Vue({
  ...App,
});
app.$mount();
