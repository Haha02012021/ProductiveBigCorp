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
};

export default coporationApi;
