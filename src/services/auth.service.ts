// src/services/auth.service.ts
import { api } from "../lib/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authService = {
  login: async (payload: LoginRequest) => {
    const res = await api.post<LoginResponse>("/admin/login", payload);
    return res.data;
  },
};
