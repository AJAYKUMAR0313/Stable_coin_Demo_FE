// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/features/wallet/pages/Dashboard";
import FiatOnRamp from "@/features/onramp/pages/FiatOnRamp";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignUpPage from "@/features/auth/pages/SignUpPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<FiatOnRamp />} />
      </Routes>
    </BrowserRouter>
  );
}