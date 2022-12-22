import instance from "./axios";

const coporationApi = {
  addManager(managerInfo) {
    return instance.post("/coporation/addManager", managerInfo);
  },
  addVersion(versionInfo) {
    return instance.post("/coporation/newVersion", versionInfo);
  },
};

export default coporationApi;
