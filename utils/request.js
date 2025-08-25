// 统一的请求封装：支持 GET / POST，含可选的 Loading、基础错误提示

const DEFAULT_TIMEOUT_MS = 10000;
const BASE_URL = ""; // 可按需修改为你的服务端地址，例如 'https://api.example.com'

function buildUrl(url) {
  if (!BASE_URL) return url;
  if (url.startsWith("http")) return url;
  const needsSlash = !BASE_URL.endsWith("/") && !url.startsWith("/");
  return needsSlash ? `${BASE_URL}/${url}` : `${BASE_URL}${url}`;
}

function showLoadingIfNeeded(showLoading) {
  if (showLoading) {
    uni.showLoading({ title: "加载中", mask: true });
  }
}

function hideLoadingIfNeeded(showLoading) {
  if (showLoading) {
    uni.hideLoading();
  }
}

function request(options) {
  const {
    url,
    method = "GET",
    data = {},
    header = {},
    timeout = DEFAULT_TIMEOUT_MS,
    showLoading = false,
    showErrorToast = true,
  } = options || {};

  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("url 不能为空"));
      return;
    }

    showLoadingIfNeeded(showLoading);

    uni.request({
      url: buildUrl(url),
      method,
      data,
      header,
      timeout,
      success: (res) => {
        const { statusCode, data: respData } = res;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(respData);
        } else {
          const err = new Error(`请求失败(${statusCode})`);
          err.response = res;
          if (showErrorToast) {
            uni.showToast({ title: `请求失败(${statusCode})`, icon: "none" });
          }
          reject(err);
        }
      },
      fail: (err) => {
        if (showErrorToast) {
          uni.showToast({ title: "网络异常，请稍后重试", icon: "none" });
        }
        reject(err);
      },
      complete: () => {
        hideLoadingIfNeeded(showLoading);
      },
    });
  });
}

function get(url, params = {}, extraOptions = {}) {
  return request({
    url,
    method: "GET",
    data: params,
    ...extraOptions,
  });
}

function post(url, body = {}, extraOptions = {}) {
  return request({
    url,
    method: "POST",
    data: body,
    header: {
      "Content-Type": "application/json",
      ...(extraOptions.header || {}),
    },
    ...extraOptions,
  });
}

export default { request, get, post };
export { request, get, post };
