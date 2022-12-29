import instance from "./axios";

const indexApi = {
  getAllModels(page) {
    return instance.get(`/models/all/?page=${page || ""}`);
  },
  getAllVersions(page) {
    return instance.get(`/versions/all/?page=${page || ""}`);
  },
  getModelById(modelId) {
    return instance.get(`/model/${modelId}`);
  },
  getProductById(productId) {
    return instance.get(`/product/detail/${productId}`);
  },
  getProductsByManagerId(managerId, condition) {
    return instance.post(`/products/manager/${managerId}`, condition);
  },
  getAllColors() {
    return instance.get("/colors/all");
  },
  getVersionById(id) {
    return instance.get(`/version/${id}`);
  },
  getAllStatuses() {
    return instance.get("/statuses/all");
  },

  getManagerByRole(roleId) {
    return instance.get(`/managers/all?role=${roleId}`);
  },

  getRequestsByManagerId(id, data, page) {
    return instance.post(`/requests/all/${id}?page=${page || ""}`, data);
  },
  getRequestById(id) {
    return instance.get(`/request/${id}`);
  },
  getProductByUuid(uuid) {
    return instance.get(`/product/${uuid}`);
  },
  analizeAmount(managerId, role, option, year, secondYear) {
    return instance.get(
      `/analize/status/${managerId}/?role=${role}&option=${option}&year=${year}&secondYear=${
        secondYear || ""
      }`
    );
  },
  analizeSoldErrorAmount(managerId, type, option, year, secondYear) {
    return instance.get(
      `/analize/${managerId}/?type=${type}&option=${option}&year=${year}&secondYear=${
        secondYear || ""
      }`
    );
  },
  analizeErrorRateByModel(managerId) {
    return instance.get(`analize/model/${managerId}/?type=error`);
  },
};

export default indexApi;
