import axios from "axios";
// import { useLoader } from "../contexts/LoaderContext";
// import { setupInterceptors } from "./networks/interceptor";

export const axiosInterceptor = axios.create({
  baseURL: "https://dummyjson.com",
});

export const setupInterceptors = (setIsLoading) => {
  axiosInterceptor.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  axiosInterceptor.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
};
