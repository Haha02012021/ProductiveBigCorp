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
};

export default indexApi;
