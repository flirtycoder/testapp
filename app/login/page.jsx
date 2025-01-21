"use client";
import Image from "next/image";
import Google from "../../public/google.svg";
import supabase from "@/supabase/client";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google sign-in error:", error);
    } else {
      console.log("Google sign-in data:", data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Signup successful! Please check your email to confirm.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full sm:w-2/3 lg:w-1/3 p-4">
        {/* Header */}
        <div className="text-center ">
          <h1 className="text-2xl sm:text-3xl font-bold">Sign Up to Dribble</h1>
        </div>

        {/* Google Sign-In */}
        <div className="text-center mt-8">
          <button
            className="border-2 flex items-center justify-center p-4 w-full rounded-full hover:bg-gray-100"
            onClick={handleGoogle}
          >
            <Image src={Google} alt="Google" height={25} width={25} />
            <span className="ml-4">Sign in with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6">
          <hr className="w-1/4 border-gray-300" />
          <h1 className="text-sm font-light mx-4 text-gray-500">
            or sign in with email
          </h1>
          <hr className="w-1/4 border-gray-300" />
        </div>

        {/* Form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            {/* Username or Email */}
            <div className="mt-6">
              <label className="block font-bold text-left">
                Username or Email
              </label>
              <input
                type="email"
                placeholder="email"
                className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mt-6">
              <div className="flex justify-between">
                <label className="font-bold">Password</label>
                <a href="#" className="text-sm text-blue-500 underline">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Success Message */}
            {success && <p className="text-green-500 mt-4">{success}</p>}

            {/* Submit Button */}
            <div className="mt-10 text-center">
              <button
                type="submit"
                className="w-full py-4 bg-blue-950 text-white font-bold rounded-full hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
