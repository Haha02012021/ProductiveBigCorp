import axios from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return axios.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return axios.post("/coporation/newVersion", versionInfo);
  },
  updateVersion(id, versionInfo) {
    return axios.put(`/coporation/version/edit/${id}`, versionInfo);
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
  analizeErrorSoldAmount(type, option, year, secondYear) {
    return axios.get(
      `/coporation/analize/?type=${type}&option=${option}&year=${year}&secondYear=${
        secondYear || ""
      }`
    );
  },
};

export default coporationApi;
