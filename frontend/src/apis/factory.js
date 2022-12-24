import instance from "./axios";

const getBatchesByFactoryId = (factoryId) => {
  return instance.get(`/factory/batches/${factoryId}`);
};

const addNewProducts = (data) => {
  return instance.post("/factory/newProducts", data);
};

export { getBatchesByFactoryId, addNewProducts };
