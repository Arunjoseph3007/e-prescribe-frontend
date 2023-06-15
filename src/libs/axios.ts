import axs from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const axios = axs.create({ baseURL });

axios.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  return config;
});

const getToken = () => {
  if (typeof window == "undefined") return "";

  const token = localStorage?.getItem("token");
  if (token) return `Token ${token}`;

  return "";
};

export default axios;
