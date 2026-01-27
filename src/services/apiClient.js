import axios from "axios";

/**
 * Create Axios instance
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * - Attach auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * - Normalize errors
 * - Avoid leaking backend internals
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        "Request failed. Please try again.";

      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    return Promise.reject(new Error("Unexpected error occurred."));
  }
);

export default apiClient;