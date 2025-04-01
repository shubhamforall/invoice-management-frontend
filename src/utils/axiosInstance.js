import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default API;
