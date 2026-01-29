// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./features/auth/pages/LoginPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import FiatOnRamp from "./features/onramp/pages/FiatOnRamp";
import TransferPage from "./features/transfer/pages/TransferPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buy" element={<FiatOnRamp />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Routes>
    </BrowserRouter>
  );
}
