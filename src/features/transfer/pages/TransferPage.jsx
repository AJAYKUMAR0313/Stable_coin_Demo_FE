import { useState } from "react";
import { useTransferStore } from "../transferStore";
import Card from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import TransferForm from "../components/TransferForm";
import TransferSummary from "../components/TransferSummary";
import TransferResult from "../components/TransferResult";


export default function TransferPage() {
  const [step, setStep] = useState("input"); // 'input' | 'confirm' | 'result'
  const {  executeTransfer,resetTransfer } = useTransferStore();

  const handleContinue = () => {
    setStep("confirm");
  };

  const handleBack = () => {
    setStep("input");
  };

  const handleConfirm = async () => {
    await executeTransfer();
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
    <div style={{ 
      maxWidth: "800px", 
      margin: "60px auto", 
      padding: "0 20px",
      width: "100%"
    }}>
      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Text.Title style={{ fontSize: "32px", marginBottom: "8px" }}>
          Send Tokens
        </Text.Title>
        <Text.Muted style={{ fontSize: "16px" }}>
          Transfer tokens to another wallet
        </Text.Muted>
      </div>

      {/* Step Indicator */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        marginBottom: "40px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: step === "input" ? "#000" : step === "confirm" || step === "result" ? "#22c55e" : "#e0e0e0",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 600,
            transition: "all 0.3s"
          }}>
            {step === "input" ? "1" : "✓"}
          </div>
          <span style={{ fontSize: "14px", color: "#666", display: window.innerWidth > 640 ? "inline" : "none" }}>
            Details
          </span>
        </div>

        <div style={{ width: "60px", height: "2px", background: step === "confirm" || step === "result" ? "#22c55e" : "#e0e0e0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: step === "confirm" ? "#000" : step === "result" ? "#22c55e" : "#e0e0e0",
            color: step === "confirm" || step === "result" ? "#fff" : "#666",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 600,
            transition: "all 0.3s"
          }}>
            {step === "result" ? "✓" : "2"}
          </div>
          <span style={{ fontSize: "14px", color: "#666", display: window.innerWidth > 640 ? "inline" : "none" }}>
            Review
          </span>
        </div>

        <div style={{ width: "60px", height: "2px", background: step === "result" ? "#22c55e" : "#e0e0e0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: step === "result" ? "#000" : "#e0e0e0",
            color: step === "result" ? "#fff" : "#666",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 600,
            transition: "all 0.3s"
          }}>
            3
          </div>
          <span style={{ fontSize: "14px", color: "#666", display: window.innerWidth > 640 ? "inline" : "none" }}>
            Complete
          </span>
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