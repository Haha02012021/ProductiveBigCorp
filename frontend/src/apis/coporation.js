import axios from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return axios.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return axios.post("/coporation/newVersion", versionInfo);
  },
  getProducts() {
    return axios.post(`/coporation/products/all`);
  },
  addModel(modelInfo) {
    return axios.post("/coporation/newModel", modelInfo);
  },
};

export default coporationApi;
