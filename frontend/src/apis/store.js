import axios from "./axios";

export const sendRequest = (data) => {
  return axios.post("/store/request/new", data);
};

export const sendWarrantService = (data) => {
  return axios.post("/store/warrantyRequest", data);
};

export const newCustomer = (data) => {
  return axios.post("/store/customer/new", data);
};

export const searchCustomer = (data) => {
  return axios.post("/store/customer/search", data);
};

export const sellProduct = (data) => {
  return axios.post("/store/sell", data);
};

export const sendWarrant = (data) => {
  return axios.post("/store/sendToWarranty", data);
};

export const completeProduct = (id, storeId) => {
  return axios.get(`/store/request/complete/${id}/${storeId}`);
};

export const deleteRequest = (id) => {
  return axios.delete(`/store/request/delete/${id}`);
};

export const warrantyReceive = (data) => {
  return axios.post(`/store/warrantyReceive`, data);
};

export const sendBackCustomer = (product_id, store_id) => {
  return axios.get(`/store/customer/sendBack/${product_id}/${store_id}`);
};
