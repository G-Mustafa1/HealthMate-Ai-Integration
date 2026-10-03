import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Agar access token expire ho gaya
    if (
      error.response?.status === 401 &&
      error.response?.data?.isExpired === true &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token se new access token lo
        await axiosInstance.post("/auth/refresh");

        // New access token cookie mein set ho chuka hai
        // Ab original request dobara bhejo
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // Refresh token bhi invalid/expired hai
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
