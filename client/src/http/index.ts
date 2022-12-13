import axios from "axios";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

import { AvailableToken } from "models/http";

const backend = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

backend.interceptors.request.use((config: AxiosRequestConfig) => {
  const headers = config.headers as RawAxiosRequestHeaders;
  headers.Authorization = `Bearer ${localStorage.getItem(
    AvailableToken.ACCESS
  )}`;
  return config;
});

export default backend;
