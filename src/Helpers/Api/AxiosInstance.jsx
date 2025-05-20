import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://127.0.0.1:3000/tokens/refresh",
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = response.data.access_token;
        localStorage.setItem("accessToken", newAccessToken);
        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure (e.g., redirect to login)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
