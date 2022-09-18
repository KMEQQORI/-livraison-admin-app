import axios from "axios";
import { appConfig } from "../config";

axios.defaults.baseURL = `${appConfig.apiUrl}/api`;

const apiRequest = axios.create();

apiRequest.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWTToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    config.headers.crossDomain = true;
    config.headers.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = "*";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return handleAxiosError(error);
  }
);

function handleAxiosError(error, history) {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = `/unAuthorized`;
    }
    if (error.response.status === 404) {
      window.location.href = "/ressourceNotFound";
    } else {
      console.log("Error response", error);
    }
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(error.request);
  } else {
    // Something happened in setting update the request and triggered an Error
    console.log("Error request", error.message);
  }
}

export default apiRequest;
