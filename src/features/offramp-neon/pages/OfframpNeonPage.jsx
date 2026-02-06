import { useEffect } from "react";
import { useOfframpStore } from "../offrampStore";
import NeonCanvas from "../components/NeonCanvas";
import CryptoCard from "../components/CryptoCard";
import RateConnector from "../components/RateConnector";
import BankCard from "../components/BankCard";
import SlideToConfirm from "../components/SlideToConfirm";
import TokenDrawer from "../components/TokenDrawer";
import PinModal from "../components/PinModal";
import ProcessingOverlay from "../components/ProcessingOverlay";
import SuccessOverlay from "../components/SuccessOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

export default function OfframpNeonPage() {
  const {
    withdrawalStatus,
    resetWithdrawal,
    loadAvailableTokens,
    loadConnectedAccount,
  } = useOfframpStore();

  useEffect(() => {
    loadAvailableTokens();
    loadConnectedAccount();
  }, []);

  const handleNewWithdrawal = () => {
    resetWithdrawal();
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleTryAgain = () => {
    resetWithdrawal();
  };

  const handleCancel = () => {
    window.location.href = "/dashboard";
  };

  return (
    <NeonCanvas>
      {/* Main Content - Input Screen */}
      {withdrawalStatus === "IDLE" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Sell Tokens
              </h1>
              <p className="text-gray-400">
                Convert crypto to INR instantly
              </p>
            </div>

            {/* Gravity Stack */}
            <div className="space-y-0">
              {/* Top Card - Crypto */}
              <CryptoCard />

              {/* Middle - Rate Connector */}
              <RateConnector />

              {/* Bottom Card - Bank */}
              <BankCard />

              {/* Slide to Confirm */}
              <SlideToConfirm />
            </div>

            {/* Back Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => window.history.back()}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {withdrawalStatus === "PROCESSING" && <ProcessingOverlay />}

      {/* Success Overlay */}
      {withdrawalStatus === "SUCCESS" && (
        <SuccessOverlay
          onNewWithdrawal={handleNewWithdrawal}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      {/* Error Overlay */}
      {withdrawalStatus === "ERROR" && (
        <ErrorOverlay
          onTryAgain={handleTryAgain}
          onCancel={handleCancel}
        />
      )}

      {/* Token Drawer */}
      <TokenDrawer />

      {/* PIN Modal */}
      <PinModal />

      {/* Global Styles */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }

        @keyframes pulse-rate {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.05); 
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @keyframes scale-in {
          from { 
            transform: scale(0); 
            opacity: 0;
          }
          to { 
            transform: scale(1); 
            opacity: 1;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes pulse-orb {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes particle {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
          }
        }

        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }

        .animate-pulse-rate {
          animation: pulse-rate 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 5s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-pulse-orb {
          animation: pulse-orb 2s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle 1.5s ease-out forwards;
        }

        /* Hide scrollbar but keep functionality */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </NeonCanvas>
  );
}