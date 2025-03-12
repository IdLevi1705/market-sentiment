// src/utils/api.ts
import axios from "axios";

// Base API instance with common configuration
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (e.g., 401, 403, 500)
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - handle authentication related issues
          console.error("Unauthorized access");
          break;
        case 403:
          // Forbidden
          console.error("Forbidden access");
          break;
        case 500:
          // Server error
          console.error("Server error");
          break;
        default:
          // Other errors
          console.error(`API Error: ${error.response.status}`);
      }
    } else if (error.request) {
      // No response received
      console.error("No response received from server");
    } else {
      // Request setup error
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
