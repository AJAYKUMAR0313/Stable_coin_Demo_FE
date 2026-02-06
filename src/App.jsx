// # Route definitions
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./features/auth/pages/LoginPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import FiatOnRamp from "./features/onramp/pages/FiatOnRamp";
import TransferPage from "./features/transfer/pages/TransferPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import TransactionHistory from "./features/transactions/TransactionHistory";
import OfframpPage from "./features/offramp/pages/OfframpPage";

import DashboardDemo from "./pages/DashboardDemo";
import StablecoinDashboard from "./features/stablecoinDashboard/stablecoinDashboard";
import AgreementRedirectLoader from "./features/stablecoinDashboard/AgreementRedirectLoader";
import { StablecoinAgreementPage } from "./features/stablecoinDashboard/StablecoinAgreementPage";

// In your router
import FiatOnRampNew from './features/onramp-refactor/pages/FiatOnRamp';
import TransferRefactor from "./features/transferRefactor";
import FiatOffRampNew from "./features/offramp-neon/pages/OfframpNeonPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/buy" element={<FiatOnRamp />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route index element={<DashboardDemo />} />
          <Route path="/dashboard/buy" element={<FiatOnRamp />} />
          <Route path="/dashboard/transfer" element={<TransferPage />} />
          <Route path="/dashboard/transactions" element={<TransactionHistory />} />
          <Route path="/dashboard/offramp" element={<OfframpPage />} />
          <Route path="/dashboard/stablecoin" element={<StablecoinDashboard/>} />
          <Route path="/dashboard/stablecoin/agreement" element={<AgreementRedirectLoader />} />
          <Route path="/dashboard/stablecoin/check-agreement" element={<StablecoinAgreementPage />} />
          <Route path="/dashboard/stablecoin/buy-stable" element={<FiatOnRampNew />} />
          <Route path="/dashboard/stablecoin/transfer-stable" element={<TransferRefactor />} />
          <Route path="/dashboard/stablecoin/convert" element={<FiatOffRampNew />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}
