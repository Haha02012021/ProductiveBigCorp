import instance from "./axios";

function getAllMaintainProducts() {
  return instance.post("/coporation/products/all", {
    condition: {
      status_id: 7,
    },
  });
}

export { getAllMaintainProducts };
