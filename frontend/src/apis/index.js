import instance from "./axios";

const indexApi = {
  getAllModels() {
    return instance.get("/models/all");
  },
  getAllVersions() {
    return instance.get("/versions/all");
  },
  getModelById(modelId) {
    return instance.get(`/model/${modelId}`);
  },
};

export default indexApi;
