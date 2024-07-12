import axios from "axios";
import { parseCookies } from "nookies";



const baseURL = "http://localhost:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL,
});

const cookies = parseCookies();

//token set----->

axiosInstance.interceptors.request.use(
  async(config) => {
    const token = cookies?.token;

    if (token !== undefined && token !== null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["ngrok-skip-browser-warning"] = "true";
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }

);
