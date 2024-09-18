import axios from "axios";

// const localUrl = "http://127.0.0.1:8000/";
// const baseUrl = "https://pdfai-back.onrender.com/";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
