import instance from "./axios";

const getBatchesByFactoryId = (factoryId) => {
  return instance.get(`/factory/batches/${factoryId}`);
};

const addNewProducts = (data) => {
  return instance.post("/factory/newProducts", data);
};

const getBatchById = (batchId) => {
  return;
};

export { getBatchesByFactoryId, addNewProducts, getBatchById };
