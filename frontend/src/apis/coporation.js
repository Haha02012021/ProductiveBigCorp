import instance from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return instance.post("/coporation/addManager", managerInfo);
  },
};

export default coporationApi;
