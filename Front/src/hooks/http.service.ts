import axios from "axios"

export const post = async <T = any>(url: string, body?: any): Promise<T> => {
  const response = await axios.post<T>(url, body);
  return response.data;
};

export const get = async <T = any>(url: string, params?: any): Promise<T> => {
  const response = await axios.get<T>(url, { params });
  return response.data;
};