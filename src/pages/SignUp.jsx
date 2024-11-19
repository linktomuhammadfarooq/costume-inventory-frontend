import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/authApi";
import eventImage from "../assets/signinImage.jpeg";
import FloatingLabelInput from "../components/FloatingLabelInput";
import AuthContext from "../contexts/AuthContext";
import toast from 'react-hot-toast';

const SignUp = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await signUp({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      const { accessToken, refreshToken } = response;
      setAuth({ accessToken, refreshToken });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
      toast.success(`Success: ${response.message}`);
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left section: Form */}
      <div className="flex flex-col justify-center w-full max-w-md p-8">
        <h1 className="mb-2 text-4xl font-semibold text-heading">Sign up</h1>
        <p className="text-gray-400 mb-7">
          Sign up to enjoy the feature of Event Costume.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 ">
            <FloatingLabelInput
              label="First Name"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
            />
            <FloatingLabelInput
              name="lastName"
              label="Last Name"
              type="text"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <FloatingLabelInput
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-4">
            <FloatingLabelInput
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-gray-500 right-3 top-3 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative mb-5">
            <FloatingLabelInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute text-gray-500 right-3 top-3 focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="w-4 h-4 form-checkbox text-primary"
            />
            <span className="ml-2 text-heading">
              I agree to the Terms and Conditions
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition duration-200 rounded-lg bg-primary hover:bg-blue-700"
          >
            {loading ? "Signing up..." : "Sign Up"}
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
            Continue with Google
          </button>

          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
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

export default SignUp;
