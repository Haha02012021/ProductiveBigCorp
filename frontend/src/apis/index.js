import axios from "./axios";

const indexApi = {
  getAllModels(page) {
    return axios.get(`/models/all/?page=${page || ""}`);
  },
  getAllVersions(page) {
    return axios.get(`/versions/all/?page=${page || ""}`);
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

  getRequestsByManagerId(id, data, page) {
    return axios.post(`/requests/all/${id}?page=${page || ""}`, data);
  },
  getRequestById(id) {
    return axios.get(`/request/${id}`);
  },
  getProductByUuid(uuid) {
    return axios.get(`/product/${uuid}`);
  },
  analizeAmount(managerId, role, option, year, secondYear) {
    return axios.get(
      `/analize/status/${managerId}/?role=${role}&option=${option}&year=${year}&secondYear=${
        secondYear || ""
      }`
    );
  },
};

export default indexApi;
