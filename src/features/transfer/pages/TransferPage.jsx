import { useState } from "react";
import { useTransferStore } from "../transferStore";
import TransferForm from "../components/TransferForm";
import TransferSummary from "../components/TransferSummary";
import TransferResult from "../components/TransferResult";
import Modal from "../components/Modal";

export default function TransferPage() {
  const [showSummary, setShowSummary] = useState(false);
  const [showResult, setShowResult] = useState(false);


  const { executeTransfer, resetTransfer } = useTransferStore();

  const handleConfirm = async () => {
    await executeTransfer();
    setShowSummary(false);
    setShowResult(true);
  };

  return (
    /* 🌌 SAME BACKGROUND AS DASHBOARD */
    <div className="min-h-screen text-white bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]">
      {/* CENTERED CONTAINER */}
      <div
        className={`max-w-[600px] mx-auto px-4 py-8 transition-all ${
          showSummary || showResult ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* MAIN FORM */}
        <TransferForm onContinue={() => setShowSummary(true)} />
      </div>

      {/* SUMMARY MODAL */}
      <Modal open={showSummary} onClose={() => setShowSummary(false)}>
        <TransferSummary
          onBack={() => setShowSummary(false)}
          onConfirm={handleConfirm}
        />
      </Modal>

      {/* RESULT MODAL */}
      <Modal
        open={showResult}
        onClose={() => {
          resetTransfer();
          setShowResult(false);
        }}
      >
        <TransferResult
          onNewTransfer={() => {
            resetTransfer();
            setShowResult(false);
          }}
          onGoToDashboard={() =>
            (window.location.href = "/dashboard/stablecoin")
          }
        />
      </Modal>
    </div>
  );
}
