import { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../../services/endpoints";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
      });
      // axios reaches here ONLY if status is 2xx
      setSuccess("Account created successfully! You can now log in.");
      // navigate after success
      setTimeout(() => {
        navigate("/");
      }, 1200);
      // clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // axios error handling
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Sign up to get started</p>

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

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          {/* <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div className="mb-6 relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a href="/" className="text-blue-500 ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
