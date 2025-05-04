import { BasePath } from "@/env/BasePath";
import { AuthActions } from "@/redux/slice/authSlide";
import { store } from "@/redux/store";
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: BasePath.BASE_URL,
  withCredentials: true,
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
});
// Thêm một bộ đón chặn request
api.interceptors.request.use(function (config) {
  const auth = store.getState().auth;
  if (auth.access_token) {
    config.headers.Authorization = "Bearer " + auth.access_token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use((response: AxiosResponse) => {
  if (response.status == 204) {
    return null
  }
  return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, async (error: AxiosError<ApiResponse<object>, any>) => {
  return handleTokenError(error, api)
});
const updateAuthHeader = (config: AxiosRequestConfig, token: string) => {
  if (config && config.headers) {
    if (typeof (config.headers as AxiosHeaders).set === 'function') {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshTokenAndRetryRequest = async (error: AxiosError<ApiResponse<object>, any>, api: AxiosInstance) => {
  try {
    const res = await store.dispatch(AuthActions.fetchRefreshToken()).unwrap();
    if (error.config) {
      updateAuthHeader(error.config, res.access_token);
      return api.request(error.config);
    }
  } catch (e) {
    console.log(e);
    store.dispatch(AuthActions.fetchLogout());
    window.location.href = "/login";
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleTokenError = (error: AxiosError<ApiResponse<object>, any>, api: AxiosInstance) => {
  const status = error.response?.status;
  const wwwAuth = error.response?.headers?.["www-authenticate"];

  if (status === 401 && wwwAuth?.includes("Bearer")) {
    const match = /error="(.+?)",\s*error_description="(.+?)"/.exec(wwwAuth);
    if (match) {
      const errorCode = match[1];
      const description = match[2];

      switch (errorCode) {
        case "invalid_token":
          if (description === "Token expired") {
            return refreshTokenAndRetryRequest(error, api);
          } else {
            store.dispatch(AuthActions.fetchLogout());
          }
          break;

        case "missing_token":
          store.dispatch(AuthActions.fetchLogout());
          break;

        default:
          console.warn("Unknown token error:", description);
      }
    }
  }
  return Promise.reject(error.response?.data || error);
};


export default api;