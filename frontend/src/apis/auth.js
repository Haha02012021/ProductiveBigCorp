import instance from "./axios";

const authApi = {
  login(loginBody) {
    return instance.post("/auth/login", loginBody);
  },

  logout() {
    return instance.delete("/auth/logout");
  },
};

export default authApi;
