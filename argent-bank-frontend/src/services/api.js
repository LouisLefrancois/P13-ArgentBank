import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/user/login", { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.post("/user/profile");
    return response.data;
  },

  updateProfile: async (firstName, lastName) => {
    const response = await api.put("/user/profile", { firstName, lastName });
    return response.data;
  },
};

export default api;
