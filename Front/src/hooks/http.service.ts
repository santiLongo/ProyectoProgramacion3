// import axios from "axios"

// export const post = async <T = any>(url: string, body?: any): Promise<T> => {
//   const response = await axios.post<T>(url, body);
//   return response.data;
// };

// export const get = async <T = any>(url: string, params?: any): Promise<T> => {
//   const response = await axios.get<T>(url, { params });
//   return response.data;
// };


import axios, { type AxiosRequestConfig } from "axios";

// ✅ Función para obtener token y datos del usuario
const getAuthData = () => {
  const token = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");
  const userData = localStorage.getItem("user") || sessionStorage.getItem("user");

  let user = null;
  try {
    user = userData ? JSON.parse(userData) : null;
  } catch {
    user = null;
  }

  return { token, user };
};

// ✅ Instancia de Axios sin baseURL
const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor para adjuntar token y datos del usuario
api.interceptors.request.use(
  (config) => {
    const { token, user } = getAuthData();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user) {
      // Opcional: enviar info del usuario
      config.headers["user-id"] = user._id ?? "";
      config.headers["user-name"] = user.userName ?? "";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Error en request:", error.response || error.message);
    throw error;
  }
);

// ✅ Métodos genéricos
export const get = async <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, { params, ...config });
  return response.data;
};

export const post = async <T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<T>(url, body, config);
  return response.data;
};