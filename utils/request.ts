// 统一的请求封装（TypeScript）：支持 GET / POST，含可选的 Loading、基础错误提示

const DEFAULT_TIMEOUT_MS = 10000;
const BASE_URL = ""; // 可按需修改为你的服务端地址，例如 'https://api.example.com'

export interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  data?: Record<string, any> | string | ArrayBuffer;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  showErrorToast?: boolean;
}

export interface BaseResponse<T = any> {
  code?: number;
  message?: string;
  data?: T;
  token?: string;
  [key: string]: any;
}

function buildUrl(url: string): string {
  if (!BASE_URL) return url;
  if (url.startsWith("http")) return url;
  const needsSlash = !BASE_URL.endsWith("/") && !url.startsWith("/");
  return needsSlash ? `${BASE_URL}/${url}` : `${BASE_URL}${url}`;
}

function showLoadingIfNeeded(showLoading?: boolean) {
  if (showLoading) {
    uni.showLoading({ title: "加载中", mask: true });
  }
}

function hideLoadingIfNeeded(showLoading?: boolean) {
  if (showLoading) {
    uni.hideLoading();
  }
}

export function request<T = any>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = "GET",
    data = {},
    header = {},
    timeout = DEFAULT_TIMEOUT_MS,
    showLoading = false,
    showErrorToast = true,
  } = options || ({} as RequestOptions);

  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("url 不能为空"));
      return;
    }

    showLoadingIfNeeded(showLoading);

    // 附带 token（如有）
    const token = uni.getStorageSync("token");
    const mergedHeader: Record<string, string> = {
      ...(header || {}),
    };
    if (token) {
      mergedHeader["Authorization"] = `Bearer ${token}`;
    }

    uni.request({
      url: buildUrl(url),
      method,
      data,
      header: mergedHeader,
      timeout,
      success: (res) => {
        const { statusCode, data: respData } =
          res as UniApp.RequestSuccessCallbackResult;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(respData as T);
        } else {
          const err: any = new Error(`请求失败(${statusCode})`);
          (err as any).response = res;
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

export function get<T = any>(
  url: string,
  params: Record<string, any> = {},
  extraOptions: Partial<RequestOptions> = {}
): Promise<T> {
  return request<T>({
    url,
    method: "GET",
    data: params,
    ...(extraOptions as RequestOptions),
  });
}

export function post<T = any>(
  url: string,
  body: Record<string, any> = {},
  extraOptions: Partial<RequestOptions> = {}
): Promise<T> {
  return request<T>({
    url,
    method: "POST",
    data: body,
    header: {
      "Content-Type": "application/json",
      ...((extraOptions.header as Record<string, string>) || {}),
    },
    ...(extraOptions as RequestOptions),
  });
}

export default { request, get, post };
