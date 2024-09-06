import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://meme-backend-iota.vercel.app/auth/reset-password",
        { email: data.email }
      );

      if (response.status === 200) {
        setMessage("OTP sent to your email address.");
        // Navigate to OTP component and pass email as state
        navigate("/otp-verification", { state: { email: data.email } });
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Password?</h2>
        <p className="text-sm text-center text-gray-600">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ce2783] to-[#403bc8] rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm font-medium text-center text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
