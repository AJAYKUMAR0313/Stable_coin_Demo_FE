import { useState } from "react";
import { useTransferStore } from "../transferStore";
import Card from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import TransferForm from "../components/TransferForm";
import TransferSummary from "../components/TransferSummary";
import TransferResult from "../components/TransferResult";

export default function TransferPage() {
  const [step, setStep] = useState("input"); // 'input' | 'confirm' | 'result'
//   const { transferStatus, resetTransfer } = useTransferStore();
  const { resetTransfer } = useTransferStore();

  const handleContinue = () => {
    setStep("confirm");
  };

  const handleBack = () => {
    setStep("input");
  };

  const handleConfirm = async () => {
    setStep("result");
    // Transfer execution happens in TransferResult component
  };

  const handleNewTransfer = () => {
    resetTransfer();
    setStep("input");
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div style={{ maxWidth: "480px", margin: "60px auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <Text.Title style={{ fontSize: "28px", marginBottom: "8px" }}>
          Send Tokens
        </Text.Title>
        <Text.Muted>Transfer tokens to another wallet</Text.Muted>
      </div>

      {/* Step Indicator */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "32px"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: step === "input" ? "#000" : "#e0e0e0",
          color: step === "input" ? "#fff" : "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 600
        }}>
          1
        </div>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: step === "confirm" ? "#000" : "#e0e0e0",
          color: step === "confirm" ? "#fff" : "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 600
        }}>
          2
        </div>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: step === "result" ? "#000" : "#e0e0e0",
          color: step === "result" ? "#fff" : "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 600
        }}>
          3
        </div>
      </div>

      {/* Content based on step */}
      {step === "input" && (
        <TransferForm onContinue={handleContinue} />
      )}

      {step === "confirm" && (
        <TransferSummary 
          onBack={handleBack}
          onConfirm={handleConfirm}
        />
      )}

      {step === "result" && (
        <TransferResult
          onNewTransfer={handleNewTransfer}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </div>
  );
}