import axios from "axios";
import { getCookie, setCookie } from "../CookiesFunction";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.isRefreshing = false;
    this.failedRequests = [];

    this.api.interceptors.request.use(
      (config) => {
        const userData = getCookie("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const token = parsedData.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.failedRequests.push(() => {
                originalRequest.headers.Authorization = `Bearer ${getCookie("userData")?.token}`;
                resolve(this.api(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshResponse = await this.api.post('/authentication/refresh');
            const newToken = refreshResponse.data.token;

            // Update userData cookie
            const userData = getCookie("userData");
            if (userData) {
              const parsedData = JSON.parse(userData);
              parsedData.token = newToken;
              setCookie("userData", JSON.stringify(parsedData), 1); // 1 day expiry
            }

            // Update the original request header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Process failed requests
            this.failedRequests.forEach(callback => callback());
            this.failedRequests = [];
            this.isRefreshing = false;

            return this.api(originalRequest);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.failedRequests = [];
            
            // Clear cookies and redirect to login
            setCookie("userData", "", -1);
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // API methods remain the same
  async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postFormData(endpoint, formData) {
    try {
      const response = await this.api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;