// src/pages/SignIn.jsx
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/authApi";
import eventImage from "../assets/signinImage.jpeg";
import FloatingLabelInput from "../components/FloatingLabelInput";
import AuthContext from "../contexts/AuthContext";
import toast from 'react-hot-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const response = await signIn(form);
      const { message, accessToken, refreshToken } = response;
      setAuth({ accessToken, refreshToken });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
      toast.success(`Welcome: ${message}`);
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center w-full max-w-md p-8">
        <h1 className="mb-2 text-4xl font-semibold text-heading">Sign in</h1>
        <p className="text-gray-400 mb-7">
          Please login to continue to your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <FloatingLabelInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative ">
            <FloatingLabelInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-gray-500 right-3 top-4 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 form-checkbox"
              />
              <span className="ml-2 text-gray-600">Keep me logged in</span>
            </label>
            <p className="-mt-2 text-center">
              <Link
                to="/forgot-password"
                className="text-gray-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition duration-200 rounded-lg bg-primary hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex items-center justify-center my-4">
            <span className="w-1/4 border-t border-gray-300"></span>
            <span className="mx-4 text-gray-400">or</span>
            <span className="w-1/4 border-t border-gray-300"></span>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full py-3 font-semibold transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-gray-400">
            Need an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>

      {/* Right section: Image */}
      <div
        className="hidden my-2 ml-6 bg-center bg-cover md:block md:w-8/12 rounded-3xl"
        style={{
          backgroundImage: `url(${eventImage})`,
        }}
      ></div>
    </div>
  );
};

export default SignIn;
