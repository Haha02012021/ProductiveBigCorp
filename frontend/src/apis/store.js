import axios from "./axios";

export const sendRequest = (data) => {
  return axios.post("/store/request/new", data);
};

export const sendWarrantService = (data) => {
  return axios.post("/store/warrantyRequest", data);
};
