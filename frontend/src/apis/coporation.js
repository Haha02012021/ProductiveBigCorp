import axios from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return axios.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return axios.post("/coporation/newVersion", versionInfo);
  },
  getProducts(data, page) {
    return axios.post(`/coporation/products/all?page=${page}`, data);
  },
  addModel(modelInfo) {
    return axios.post("/coporation/newModel", modelInfo);
  },
  deleteModel(modelId) {
    return axios.delete(`/coporation/model/${modelId}`);
  },
  deleteVersion(versionId) {
    return axios.delete(`/coporation/version/${versionId}`);
  },
};

export default coporationApi;
