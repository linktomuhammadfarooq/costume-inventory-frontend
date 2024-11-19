import React, { useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import eventImage from "../assets/signinImage.jpeg";
import { forgotPassword } from '../api/authApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const response = await forgotPassword(email);
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
      <div className="w-full max-w-md p-8 flex items-center">
        <div className="w-full">
          <h1 className="text-4xl text-heading font-semibold mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-400 mb-6">
            Enter your registered email address.
          </p>
          
          <form onSubmit={handleSubmit}>
            <FloatingLabelInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Processing...' : 'Forgot Password'}
            </button>
            {error && <p className="text-red-400">{error}</p>}
            <div className="text-center mt-4 text-gray-400">
              Need an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Create one
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right side image section */}
      <div
        className="hidden md:block md:w-8/12 bg-cover bg-center ml-6 my-2 rounded-3xl"
        style={{
          backgroundImage: `url(${eventImage})`,
        }}
      ></div>
    </div>
  );
};

export default ForgotPassword;
