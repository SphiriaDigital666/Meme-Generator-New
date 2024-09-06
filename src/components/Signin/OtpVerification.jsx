import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state; // Retrieve email passed from ForgotPassword
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://meme-backend-iota.vercel.app/auth/validate-otp",
        {
          email,
          otp: data.otp,
          newPassword: data.newPassword,
        }
      );
      

      if (response.status === 200) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">OTP Verification</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter OTP"
              {...register("otp", {
                required: "OTP is required",
              })}
            />
            {errors.otp && (
              <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="newPassword" className="sr-only">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#ce2783] to-[#403bc8] rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP and Reset Password
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

export default OtpVerification;
