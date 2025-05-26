import { BasePath } from "@/env/BasePath";
import { AuthActions } from "@/redux/slice/authSlice";
import { store } from "@/redux/store";
import AuthService from "@/services/AuthService";
import { handleMutation } from "@/util/mutation";
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
  console.log(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use((response: AxiosResponse) => {
  if (response.status == 204) {
    return null
  }
  console.log(response);
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
  await handleMutation(() => AuthService.refreshToken(), (res) => {
    console.log(res);
    const response = res.data;
    if (error.config && response) {
      updateAuthHeader(error.config, response.access_token);
      return api.request(error.config);
    }
  }, () => {
    store.dispatch(AuthActions.reset());
    window.location.href = "/login";
  });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleTokenError = (error: AxiosError<ApiResponse<object>, any>, api: AxiosInstance) => {
  const status = error.response?.status;
  const wwwAuth = error.response?.headers['www-authenticate'];
  console.log("error", wwwAuth);

  if (status === 401 && wwwAuth?.includes("Bearer")) {
    const match = /error="(.+?)",\s*error_description="(.+?)"/.exec(wwwAuth);
    if (match) {
      const errorCode = match[1];
      const description = match[2];
      console.log("description", description);


      switch (errorCode) {
        case "invalid_token":
          if (description.includes("Jwt expired")) {
            return refreshTokenAndRetryRequest(error, api);
          } else {
            store.dispatch(AuthActions.reset());
          }
          break;

        case "missing_token":
          store.dispatch(AuthActions.reset());
          break;

        default:
          console.warn("Unknown token error:", description);
      }
    }
  }
  return Promise.reject(error.response?.data || error);
};


export default api;