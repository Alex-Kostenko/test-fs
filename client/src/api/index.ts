import { notification } from "antd";
import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.REACT_APP_API;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config): Promise<InternalAxiosRequestConfig> => {
    //TODO for feature handling auth

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      //TODO for feature handling auth
    }
    notification.error({
      message: "Error:",
      description: JSON.stringify(error.response),
    });

    return Promise.reject(error);
  }
);

export { api };
