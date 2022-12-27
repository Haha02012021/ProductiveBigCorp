import instance from "./axios";

const getBatchesByFactoryId = (factoryId, condition) => {
  return instance.post(`/factory/batches/${factoryId}`, condition);
};

const addNewProducts = (data) => {
  return instance.post("/factory/newProducts", data);
};

const acceptRequest = (reqId, factoryId) => {
  return instance.get(`/factory/request/accept/${reqId}/${factoryId}`);
};

const refuseRequestById = (id, data) => {
  return instance.post(`/factory/request/refuse/${id}`, data);
};

const receiveBrokenProducts = (data) => {
  return instance.post("/factory/receiveBrokenProducts", data);
};

const requestSummon = (batchId, factoryId, data) => {
  return instance.post(
    `/factory/products/summon/${batchId}/${factoryId}`,
    data
  );
};

export {
  getBatchesByFactoryId,
  addNewProducts,
  refuseRequestById,
  acceptRequest,
  receiveBrokenProducts,
  requestSummon,
};
