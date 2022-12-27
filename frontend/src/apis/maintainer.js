import instance from "./axios";

function getAllMaintainProducts(managerId, statusId) {
  return instance.post(`/products/manager/${managerId}`, {
    condition: {
      status_id: statusId,
    },
  });
}

function maintainProducts(data) {
  return instance.post("/warranty/maintain", data);
}

function doneMaintian(data) {
  return instance.post("/warranty/doneWarranty", data);
}

function returnBackToStore(data) {
  return instance.post("/warranty/sendBack", data);
}

function returnBackToFactory(data) {
  return instance.post("/warranty/sendBackToFactory", data);
}

export {
  getAllMaintainProducts,
  maintainProducts,
  doneMaintian,
  returnBackToStore,
  returnBackToFactory,
};
