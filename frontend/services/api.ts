// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;

// let refreshPromise: Promise<any> | null = null;

// const refreshAccessToken = async () => {
//   if (!refreshPromise) {
//     refreshPromise = axiosInstance
//       .post("/auth/refresh")
//       .finally(() => {
//         refreshPromise = null;
//       });
//   }

//   return refreshPromise;
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.isExpired === true &&
//       !originalRequest?._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         await refreshAccessToken();

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export { refreshAccessToken };

// export default axiosInstance;



import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Auth endpoints par 401 ko refresh mat karo
    const isAuthRequest =
      originalRequest?.url === "/auth/login" ||
      originalRequest?.url === "/auth/signup" ||
      originalRequest?.url === "/auth/verify-email-otp" ||
      originalRequest?.url === "/auth/forgot-password" ||
      originalRequest?.url === "/auth/verify-reset-otp" ||
      originalRequest?.url === "/auth/reset-password";

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    // Refresh endpoint khud fail ho to dobara refresh mat karo
    if (originalRequest?.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    // Sirf 401 par refresh
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      }).then(() => {
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axiosInstance.post("/auth/refresh");

      processQueue();

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);


export default axiosInstance;
