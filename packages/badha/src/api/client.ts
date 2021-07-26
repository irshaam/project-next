import axios from "axios";
// import { route } from "preact-router";

// import { config } from "../config";
// const { BASE_URL: baseURL } = config;

const baseURL = "http://localhost:5000";

const ApiClient = (): any => {
  const defaultOptions = {
    baseURL,
  };
  const instance = axios.create(defaultOptions);

  // Set content type for all post endpoints
  // instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  // Set Auth Token if it exists
  // instance.interceptors.request.use((config) => {
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("access_token");
  //     config.headers.Authorization = token ? `Bearer ${token}` : "";
  //   }
  //   return config;
  // });

  // instance.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem("access_token");
  //     if (token) {
  //       config.headers["Authorization"] = `Bearer ${token}`;
  //     }
  //     // config.headers['Content-Type'] = 'application/json';
  //     return config;
  //   },
  //   (error) => {
  //     Promise.reject(error);
  //   }
  // );

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     const originalRequest = error.config;

  //     if (error.response.status === 401) {
  //       const token = localStorage.removeItem("access_token");
  //       route("/login");
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default ApiClient();
