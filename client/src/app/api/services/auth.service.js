import axios from "axios";
import localStorageService from "./localStorage.service";
import configFile from "../../configFile.json";
const httpAuth = axios.create({
  baseURL: configFile.apiEndPoint + "auth/",
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post("signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  logIn: async ({ email, password }) => {
    const data = await httpAuth.post("signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });

    return data;
  },
};
export default authService;
