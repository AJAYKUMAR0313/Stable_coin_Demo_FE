// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/features/wallet/pages/Dashboard";
import FiatOnRamp from "@/features/onramp/pages/FiatOnRamp";
import Login from "@/features/auth/pages/login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<FiatOnRamp />} />
      </Routes>
    </BrowserRouter>
  );
}