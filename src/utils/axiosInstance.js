import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default API;
