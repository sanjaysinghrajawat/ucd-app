"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Header from "../landing/Header";
import Link from "next/link";
import axios from "axios"; // Import axios for API requests
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.access_token);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Login failed";
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((msg) => toast.error(msg.msg));
      } else {
        toast.error(errorMessage);
      }
    }
  };  

  return (
    <>
      <Header />
      <div className="py-16 mt-5">
        <div className="flex bg-white rounded-lg shadow-sm overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          {/* Left Section - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-gray-100">
            <img src="/login.png" alt="Login" className="object-cover h-full w-full" />
          </div>

          {/* Right Section - Form */}
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Extractor
            </h2>
            <div className="text-xl text-gray-600 text-center">Welcome back!</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4" />
              <p className="text-xs text-center text-gray-500 uppercase">
                Login with Email
              </p>
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Email Field */}
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Sign-Up Link */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4" />
              <Link href="/signup" className="text-xs text-gray-500 uppercase">
                Or Sign Up
              </Link>
              <span className="border-b w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Login;
