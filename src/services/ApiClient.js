import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Error 401: Unauthorized");
      }

      if (status === 404) {
        console.error("Error 404: Not Found");
      }

      console.error(`Error ${status}:`, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);
export default apiClient;
