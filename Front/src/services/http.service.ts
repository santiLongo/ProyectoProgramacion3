import axios, { type AxiosRequestConfig } from "axios";
import { triggerGlobalError } from "../utils/error-handler";

const getAuthData = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userData =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch {
    user = null;
  }

  return { token, user };
};

const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const { token, user } = getAuthData();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user) {
      config.headers["user-id"] = user._id ?? "";
      config.headers["user-name"] = user.userName ?? "";
      config.headers["user-role"] = user.role ?? "";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Error en request:", error.response || error.message);

    const raw = error.response?.data;
    const message = typeof raw === "string" ? raw : raw?.error || raw?.mensaje || error.message;

    triggerGlobalError(message);

    return Promise.reject(error);
  }
);

export const get = async <T = any>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(url, { params, ...config });
  return response.data;
};

export const post = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(url, body, config);
  return response.data;
};
