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
    return axios.post(`/products/manager/${managerId}`, condition);
  },
  getAllColors() {
    return axios.get("/colors/all");
  },
  getVersionById(id) {
    return axios.get(`/version/${id}`);
  },
  getAllStatuses() {
    return axios.get("/statuses/all");
  },

  getManagerByRole(roleId) {
    return axios.get(`/managers/all?role=${roleId}`);
  },

  getRequestsByManagerId(Id, data) {
    return axios.post(`/requests/all/${Id}`, data);
  },
  getRequestById(id) {
    return axios.get(`/request/${id}`);
  },
  getProductByUuid(uuid) {
    return axios.get(`/product/${uuid}`);
  },
};

export default indexApi;
