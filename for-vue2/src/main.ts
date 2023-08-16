import Vue from "vue";
import App from "./App.vue";
import Huni from "./packages/index";
Vue.use(Huni);
Vue.config.productionTip = false;
uni.addInterceptor({
  returnValue(res) {
    if (
      !(
        !!res &&
        (typeof res === "object" || typeof res === "function") &&
        typeof res.then === "function"
      )
    ) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res: [unknown, unknown]) =>
        res[0] ? reject(res[0]) : resolve(res[1])
      );
    });
  },
});
const app = new (
  typeof App === "function"
    ? App
    : Vue.extend(Object.assign({ mpType: "app" }, App))
)();
app.$mount();
