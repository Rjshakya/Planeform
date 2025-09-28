import 'client-only';
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
