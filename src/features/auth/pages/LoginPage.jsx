import React from "react";
import { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../../services/endpoints";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8000/auth/login`, {
        username: email,
        password,
      });

      const data = response.data;

      if (data.success) {
        // ✅ REAL success
        setSuccess("Login successful!");

        localStorage.setItem("wallet_address", data.wallet_address);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userID", data.userid);

        console.log("Login success:", data);

        navigate("/dashboard");
      } else {
        // ❌ Backend-auth failure
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      // ❌ Network / server error
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md box-border">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Please login to your account
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm  mt-4">
          Don’t have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            {" "}
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
