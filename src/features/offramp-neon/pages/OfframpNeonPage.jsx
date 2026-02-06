import { useEffect ,useState} from "react";
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

  const handleNewWithdrawal = () => resetWithdrawal();
  const handleGoToDashboard = () => window.location.href = "/dashboard/stablecoin";
  const handleTryAgain = () => resetWithdrawal();
  const handleCancel = () => window.location.href = "/dashboard/stablecoin";
  // 1. Add a ref and state for mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Getting mouse position relative to the viewport
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative overflow-hidden">
    {/* 2. The Spotlight Layer */}
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }}
    />
    <NeonCanvas>
      {withdrawalStatus === "IDLE" && (
        <div className="flex items-center justify-center p-2 ">
          
          {/* Main Content Wrapper */}
          <div className="w-full max-w-6xl">
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Sell Tokens</h1>
              <p className="text-gray-400">Convert stablecoin to INR instantly</p>
            </div>

            {/* GRID SYSTEM FOR PERFECT SYMMETRY 
              - Mobile: Single column (stack)
              - Desktop: Left Card (1fr) | Arrow (Auto) | Right Card (1fr)
            */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 relative">
              
              {/* Left Column: Crypto Card */}
              <div className="w-full min-w-0">
                <CryptoCard />
              </div>

              {/* Center Column: Connector */}
              <div className="flex justify-center z-10 -my-4 md:my-0">
                <RateConnector />
              </div>

              {/* Right Column: Bank Card */}
              <div className="w-full min-w-0">
                <BankCard />
              </div>
            </div>

            {/* Confirm Button (Centered) */}
            <div className="w-full max-w-md mx-auto mt-10">
              <SlideToConfirm />
              
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
        </div>
      )}

      {withdrawalStatus === "PROCESSING" && <ProcessingOverlay />}
      
      {withdrawalStatus === "SUCCESS" && (
        <SuccessOverlay
          onNewWithdrawal={handleNewWithdrawal}
          onGoToDashboard={handleGoToDashboard}
        />
      )}

      {withdrawalStatus === "ERROR" && (
        <ErrorOverlay
          onTryAgain={handleTryAgain}
          onCancel={handleCancel}
        />
      )}

      <TokenDrawer />
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
    </div>
  );
}