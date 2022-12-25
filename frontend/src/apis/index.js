import axios from "./axios";

const indexApi = {
  getAllModels() {
    return axios.get("/models/all");
  },
  getAllVersions() {
    return axios.get("/versions/all");
  },
  getModelById(modelId) {
    return axios.get(`/model/${modelId}`);
  },
  getProductById(productId) {
    return axios.get(`/product/detail/${productId}`);
  },
  getProductsByManagerId(managerId, condition) {
    return axios.get(`/products/manager/${managerId}`, condition);
  },
  getAllColors() {
    return axios.get("/colors/all");
  },
  getVersionById(id) {
    return axios.get(`/version/${id}`);
  },
};

export default indexApi;
