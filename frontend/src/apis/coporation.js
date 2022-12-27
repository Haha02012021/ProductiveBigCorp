import axios from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return axios.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return axios.post("/coporation/newVersion", versionInfo);
  },
  getProducts(data) {
    return axios.post(`/coporation/products/all`, data);
  },
  addModel(modelInfo) {
    return axios.post("/coporation/newModel", modelInfo);
  },

  deleteModel(id) {
    return axios.delete(`/coporation/model/${id}`);
  },

  deleteVersion(id) {
    return axios.delete(`/coporation/version/${id}`);
  },
};

export default coporationApi;
