import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
});

// Add a request interceptor
apiRequest.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If the token exists, set the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default apiRequest;
