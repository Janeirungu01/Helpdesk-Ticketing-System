import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
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


// import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Helper function to check token expiration
// const isTokenExpired = (token) => {
//   if (!token) return true;
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return Date.now() >= payload.exp * 1000;
//   } catch (e) {
//     return true; // If token is malformed, treat as expired
//   }
// };

// // Request interceptor for both initial token and refresh logic
// AxiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refresh_token");

//     // Add authorization header if token exists
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Proactively refresh if token is expired or about to expire
//     if (token && isTokenExpired(token) && refreshToken && !config._skipRefresh) {
//       try {
//         const response = await axios.post(
//           `${config.baseURL}/tokens/refresh`,
//           {},
//           {
//             headers: {
//               "Refresh-Token": refreshToken,
//               'Content-Type': 'application/json'
//             },
//             _skipRefresh: true // Prevent infinite loops
//           }
//         );

//         const newAccessToken = response.data.token;
//         localStorage.setItem("token", newAccessToken);
//         config.headers.Authorization = `Bearer ${newAccessToken}`;
//       } catch (refreshError) {
//         // Clean up and redirect if refresh fails
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("user");
//         window.location.href = "/"; // 
//         return Promise.reject(refreshError);
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for handling 401s (fallback)
// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Only handle 401 errors that haven't been retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (!refreshToken) {
//         // No refresh token available - full logout
//         clearAuthAndRedirect();
//         return Promise.reject(error);
//       }

//       try {
//         const response = await axios.post(
//           `${originalRequest.baseURL}/tokens/refresh`,
//           {},
//           {
//             headers: {
//               "Refresh-Token": refreshToken,
//               'Content-Type': 'application/json'
//             },
//             _skipRefresh: true
//           }
//         );

//         const newAccessToken = response.data.token;
//         localStorage.setItem("token", newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return AxiosInstance(originalRequest);
//       } catch (refreshError) {
//         clearAuthAndRedirect();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Helper function for cleaning auth state
// function clearAuthAndRedirect() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("user");
//   // Use your app's navigation method instead of window.location
//   window.location.href = "/"; 
// }

// export default AxiosInstance;