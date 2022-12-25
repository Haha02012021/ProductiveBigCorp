import axios from "./axios";

export const sendRequest = (data) => {
  return axios.post("/store/request/new", data);
};
