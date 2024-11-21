"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import Header from "../landing/Header";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/auth/sign-up", // Update API route
        formData
      );
      toast.success("Sign-Up Successful");
      router.push("/Login")
    } catch (error) {
      toast.error(error.response?.data?.detail || "Sign-Up failed");
    }
  };

  return (
    <>
      <Header />
      <div className="py-16 mt-5">
        <div className="flex bg-white rounded-lg shadow-sm overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="lg:block lg:w-1/2 bg-cover mt-20">
            <img src="/login.png" alt="Login Illustration" />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">
              Welcome! Sign Up Below
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default SignUp;
