import axios from "axios";
import {
  LIST_DOCTORS,
  BOOK_APPOINTMENT,
  SHOW_APPOINTMENT,
  LOG_OUT_API,
  CANCLE_APPOINTMENT,
} from "./Api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
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

const getDashboardApi = (params) => {
  return axios.get(LIST_DOCTORS, {
    headers: headers,
    params: params,
  });
};

const bookAppointment = (params) => {
  return axios.post(BOOK_APPOINTMENT, params, {
    headers: headers,
  });
};

const ShowAppointment = () => {
  return axios.get(SHOW_APPOINTMENT, {
    headers: headers,
  });
};

const LogOut = () => {
  return axios.post(LOG_OUT_API, {
    headers: headers,
  });
};

const CancleAppointment = (params) => {
  return axios.delete(CANCLE_APPOINTMENT, {
    headers: headers,
    params: params,
  });
};

export {
  getDashboardApi,
  bookAppointment,
  ShowAppointment,
  LogOut,
  CancleAppointment,
};
