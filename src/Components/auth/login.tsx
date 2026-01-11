"use client";

import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "../../services/auth.service";
import { storage } from "../../utils/storage";

export default function AdminLogin() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    // ✅ basic validation
    if (!adminId || !password) {
      setError("Please enter Admin ID and Password");
      return;
    }

    try {
      setLoading(true);

      // ✅ API CALL
      const data = await authService.login({
        username: adminId,
        password: password,
      });

      // ✅ Token Store
      storage.setToken(data.token);

      // ✅ Dashboard Navigate
      router.push("/dashboard");
    } catch (err: any) {
      console.log("Login error:", err);

      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative overflow-visible">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-blue-300 rounded-full p-1 border-4 border-white shadow-lg w-20 h-20 flex items-center justify-center">
            <img
              src="/loginavatar.png"
              alt="Admin Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* responsive padding */}
        <div className="px-5 sm:px-10 pt-16 pb-6">
          <h2 className="text-xl font-normal text-gray-600 text-center mb-8">
            Admin Log In
          </h2>

          <div className="space-y-4 mb-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-gray-500" />
              </div>

              <div className="absolute inset-y-0 left-[44px] flex items-center pointer-events-none">
                <div className="h-5 w-[1.5px] bg-[#D2E7FF]" />
              </div>

              <input
                type="text"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="
                  w-full sm:w-[350px] h-[50px]
                  rounded-[5.34px]
                  border-[1.5px] border-[#D2E7FF]
                  bg-white
                  pl-[60px] pr-4
                  text-sm text-gray-700 placeholder-gray-400
                  outline-none
                  focus:border-blue-400 focus:ring-0
                "
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>

              <div className="absolute inset-y-0 left-[44px] flex items-center pointer-events-none">
                <div className="h-5 w-[1.5px] bg-[#D2E7FF]" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full sm:w-[350px] h-[50px]
                  rounded-[5.34px]
                  border-[1.5px] border-[#D2E7FF]
                  bg-white
                  pl-[60px] pr-12
                  text-sm text-gray-700 placeholder-gray-400
                  outline-none
                  focus:border-blue-400 focus:ring-0
                "
              />

              {/* ✅ Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-6 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* ✅ Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full sm:w-[171px] h-[45px]
              rounded-[7px]
              px-[25px] py-[10px]
              text-white text-sm font-normal
              flex items-center justify-center gap-[10px]
              transition-all duration-200
              hover:opacity-90
              mx-auto sm:mx-0 sm:ml-23
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            style={{
              background: "linear-gradient(180deg, #AED1FF 0%, #7E91A9 100%)",
            }}
          >
            {loading ? "Logging in..." : "Login As Admin"}
          </button>

          {/* logo responsive positioning */}
          <div className="flex justify-center sm:justify-end sm:-mr-6 mt-4 sm:mt-0">
            <img
              src="/logo.png"
              alt="Monalisha Logo"
              className="h-28 sm:h-40 w-auto object-contain opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



