import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.93:8080",
  timeout: 10000,
});

export default api;
