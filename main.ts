import App from "./App";
import requestApi from "./utils/request";

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  // 如需在全局暴露请求方法（建议在组合式 API 中按需导入）
  app.config.globalProperties.$request = requestApi.request;
  app.config.globalProperties.$get = requestApi.get;
  app.config.globalProperties.$post = requestApi.post;
  return {
    app,
  };
}
// #endif
