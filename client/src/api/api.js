import axios from "axios";

const api = axios.create({
  baseURL: "https://demo-13r2.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: () => true,
});

export default api;
