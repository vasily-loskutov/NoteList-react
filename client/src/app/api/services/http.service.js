import axios from "axios";
import configFile from "../../configFile.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";
import toast from "toastify";
const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresData();
    const accessToken = localStorageService.getAccessToken();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpiredDate = refreshToken && expiresDate < Date.now();
    if (isExpiredDate) {
      const data = await authService.refresh();

      localStorageService.setTokens(data);
    }
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data.id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}
http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }

    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Ошибка. Попробуйте позже");
    }
    return Promise.reject(error);
  }
);
const httpServices = {
  get: http.get,
  put: http.put,
  post: http.post,
  delete: http.delete,
  patch: http.patch,
};
export default httpServices;
