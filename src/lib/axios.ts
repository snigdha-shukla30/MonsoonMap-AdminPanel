// src/lib/axios.ts
import axios from "axios";
import { storage } from "../utils/storage";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://monsoonbackend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor => har API me token add
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token added to request:", config.url);
    } else {
      console.log("⚠️ No token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor => agar 401 error aaye to logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("🔒 Unauthorized - Clearing token");
      storage.removeToken();
      // Optional: redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);




// // src/lib/axios.ts
// import axios from "axios";
// import { storage } from "../utils/storage";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // example: http://localhost:5000
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ request interceptor => har API me token add
// api.interceptors.request.use((config) => {
//   const token = storage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
