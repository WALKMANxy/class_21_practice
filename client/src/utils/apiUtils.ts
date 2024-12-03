// src/services/api/apiUtils.ts
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  import { getAccessToken } from "../services/tokenService";
import { getApiUrl } from "../config/config";
  
  // Initialize apiUrl and ensure it's defined
  export const apiUrl: string = getApiUrl() || "";
  if (!apiUrl) {
    throw new Error("Environment variable VITE_API_BASE_URL is not defined.");
  }
  

  export interface AuthApiResponse {
    message: string;
    statusCode: number;
  }
  
  // Create an Axios instance with default configurations
  export const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      "bypass-tunnel-reminder": "true",
    },
    timeout: 20000,
  });
  
  // Request interceptor to attach the access token
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.url === "/auth/logout") {
        return config;
      }
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export const apiCall = async <T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    data?: unknown
  ): Promise<T> => {
    try {
      const config: AxiosRequestConfig = {
        url: endpoint,
        method,
        data,
      };
  
      const response: AxiosResponse<T> = await axiosInstance(config);
      return response.data;
    } catch (error) {
      console.error(`Error during ${method} request to ${endpoint}:`, error);
  
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const serverMessage =
          axiosError.message ||
          axiosError.response?.statusText ||
          "An error occurred while processing the request";
        console.error(serverMessage);
        throw error;
      }
  
      throw new Error(
        error instanceof Error ? error.message : "Unexpected error occurred"
      );
    }
  };
  
  export const authApiCall = async <T>(
    endpoint: string,
    method: "GET" | "POST",
    data?: unknown
  ): Promise<T & AuthApiResponse> => {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method,
      data,
    };
  
    try {
      const response: AxiosResponse<T & Partial<AuthApiResponse>> =
        await axiosInstance(config);
      return {
        ...response.data,
        message: response.data.message || "Success",
        statusCode: response.status,
      };
    } catch (error: unknown) {
      let message = "An error occurred";
      let statusCode = 500;
      let responseData = {} as T;
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { data, status } = error.response;
          responseData = data as T;
          message = data?.message || message;
          statusCode = status;
        } else {
          message = error.message || message;
        }
      } else if (error instanceof Error) {
        message = error.message || message;
      }
  
      return {
        ...responseData,
        message,
        statusCode,
      };
    }
  };
  