import instance from "./axios";

const getBatchesByFactoryId = (factoryId) => {
  return instance.get(`/factory/batches/${factoryId}`);
};

const addNewProducts = (data) => {
  return instance.post("/factory/newProducts", data);
};

const acceptRequest = (reqId, factoryId) => {
  return instance.get(`/factory/request/accept/${reqId}/${factoryId}`);
};

const refuseRequestById = (id, data) => {
  return instance.get(`/factory/request/refuse/${id}`);
};

export {
  getBatchesByFactoryId,
  addNewProducts,
  refuseRequestById,
  acceptRequest,
};
