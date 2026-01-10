// src/types/auth.ts
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
