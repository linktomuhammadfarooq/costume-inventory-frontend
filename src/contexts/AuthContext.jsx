// src/contexts/AuthContext.js

import React, { createContext, useEffect, useState } from "react";
import { refreshAccessToken } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  });

  const refreshTokenHandler = async () => {
    try {
      const { accessToken } = await refreshAccessToken(auth.refreshToken);
      setAuth((prevAuth) => ({ ...prevAuth, accessToken }));
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logoutHandler();
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ accessToken: null, refreshToken: null });
  };

  useEffect(() => {
    if (auth.refreshToken) {
      const interval = setInterval(() => {
        refreshTokenHandler();
      }, 14 * 60 * 1000); // Refresh every 14 minutes
      return () => clearInterval(interval);
    }
  }, [auth.refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
