import httpServices from "./http.service";
const userEndPoint = "user/";
const usersService = {
  get: async () => {
    const { data } = await httpServices.get(userEndPoint);

    return data;
  },
};
export default usersService;
