import axios from "axios";
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

import { AvailableToken } from "models/http";
import { APi_URL } from "constants/http.constants";

const backend = axios.create({
  baseURL: APi_URL,
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
