/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Vue from 'vue';
import App from './App.vue';
import Huni from './packages/index';

Vue.config.productionTip = false;
Vue.use(Huni);
uni.addInterceptor({
  returnValue(res) {
    if (
      !(
        !!res
        && (typeof res === 'object' || typeof res === 'function')
        && typeof res.then === 'function'
      )
    ) {
      return res;
    }
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line promise/catch-or-return, no-shadow
      res.then((res: [unknown, unknown]) => (res[0] ? reject(res[0]) : resolve(res[1])));
    });
  },
});

const app = new App();
app.$mount();
