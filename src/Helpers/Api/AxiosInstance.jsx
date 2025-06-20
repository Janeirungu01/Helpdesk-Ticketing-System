import axios from "axios";

//const BASE_URL =  "http://192.168..0.19:3000";
const BASE_URL =  "http://localhost:3000";

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

const AxiosInstance = axios.create({
  baseURL:  BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

// Add Authorization header before each request
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401s by refreshing token
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Missing refresh token");
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000"}/tokens/refresh`,
          {},
          {
            headers: {
              "Refresh-Token": refreshToken,
              'Content-Type': 'application/json'
            },
          }
        );


        const newAccessToken = response.data.token;
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;