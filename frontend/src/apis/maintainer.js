import instance from "./axios";

function getAllMaintainProducts(managerId) {
  return instance.post(`/products/manager/${managerId}`, {
    condition: {
      status_id: 7,
    },
  });
}

export { getAllMaintainProducts };
