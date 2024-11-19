import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/authApi";
import logo from "../assets/logo.png";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const { auth, logoutHandler } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(auth.accessToken, auth.refreshToken);
      logoutHandler();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 transition-colors ${
        isScrolled ? "bg-blue-500" : "bg-transparent"
      }`}
    >
      <img src={logo} alt="Logo" className="h-8" />
      <div className="flex gap-4">
        {auth.accessToken ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-gray-800 rounded"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-blue-600 rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
