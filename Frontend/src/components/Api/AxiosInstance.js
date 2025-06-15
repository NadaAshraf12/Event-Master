import axios from "axios";
import { getCookie } from "./CookiesFunction";

const axiosInstance = axios.create({
	baseURL: "https://localhost:7024/api",
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const userData = getCookie("userData");
		if (userData) {
			const token = JSON.parse(userData).token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
