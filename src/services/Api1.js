import axios from "axios";
import { GET_REPORT_API } from "./Api";

axios.interceptors.request.use(
  (config) => {
    const newtoken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExNjgsImlhdCI6MTcyNzY5NjUzOH0.tYdcP1FI-xe006GtH0LBVnPtqzcHqkpdQBNAM00CTzw";
    const token = localStorage.setItem("token", newtoken);
    if (newtoken) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const headers = {
  "Content-Type": "application/json",
};

// const getListReports = (params: any) => {
// return axios.get(GET_REPORT_API, {
//   headers: headers,
//   params: params,
// });
// };
const getListReports = (params) => {
  return axios.get(`${GET_REPORT_API}?page=${params}`, {
    headers: headers,
  });
};

export { getListReports };
