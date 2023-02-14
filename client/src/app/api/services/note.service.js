import httpServices from "./http.service";

const noteEndPoint = "note/";
const noteServices = {
  create: async (payload) => {
    const data = await httpServices.post(noteEndPoint, payload);

    return data;
  },
  get: async () => {
    const { data } = await httpServices.get(noteEndPoint);

    return data;
  },
  remove: async (id) => {
    const { data } = await httpServices.delete(noteEndPoint + id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpServices.patch(
      noteEndPoint + payload._id,
      payload
    );

    return data;
  },
};
export default noteServices;
