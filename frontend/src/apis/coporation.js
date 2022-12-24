import axios from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return axios.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return axios.post("/coporation/newVersion", versionInfo);
  },
  getProducts() {
    return axios.get(`/coporation/products/all`);
  },
};

export default coporationApi;
