// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./features/auth/pages/LoginPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import FiatOnRamp from "./features/onramp/pages/FiatOnRamp";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/buy" element={<FiatOnRamp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
