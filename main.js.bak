import App from "./App";
import requestApi from "./utils/request.js";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
// 全局挂载（Vue2）
Vue.prototype.$request = requestApi.request;
Vue.prototype.$get = requestApi.get;
Vue.prototype.$post = requestApi.post;
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
