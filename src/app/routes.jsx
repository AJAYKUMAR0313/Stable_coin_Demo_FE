// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/features/wallet/pages/Dashboard";
import FiatOnRamp from "@/features/onramp/pages/FiatOnRamp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buy" element={<FiatOnRamp />} />
      </Routes>
    </BrowserRouter>
  );
}