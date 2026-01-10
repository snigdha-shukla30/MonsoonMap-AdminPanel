// src/lib/axios.ts
import axios from "axios";
import { storage } from "../utils/storage";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // example: http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ request interceptor => har API me token add
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
