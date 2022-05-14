import axios from "axios";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";

const api = axios.create({
  baseURL: "https://server-app-chat-v2.herokuapp.com/api",
});

api.interceptors.request.use(
  async (config) => {
    if (await isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + await isAuthenticated();
      config.headers["x-access-token"] = await isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
