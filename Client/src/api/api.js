import axios from "axios";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";

const api = axios.create({
  baseURL: "https://server-app-chat-v2.herokuapp.com/api",
});

api.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + isAuthenticated();
      config.headers["x-access-token"] = isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
