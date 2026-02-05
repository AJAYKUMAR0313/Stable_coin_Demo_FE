import { useEffect, useState } from "react";
import { useOnRampStore } from "../onrampStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import StablecoinSelector from "../components/StablecoinSelector";
import TokenAmountInput from "../components/TokenAmountInput";
import RatePreview from "../components/RatePreview";
import SummaryCard from "../components/SummaryCard";
import PaymentModal from "../components/PaymentModal";
import TransactionStatus from "../components/TransactionStatus";

export default function FiatOnRamp() {
  const {
    loadStablecoins,
    startConversion,
    selectedToken,
    tokenAmount,
    conversionStatus,
    resetTransaction,
  } = useOnRampStore();

  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    loadStablecoins();
  }, []);

  const total =
    selectedToken && tokenAmount ? tokenAmount * selectedToken.rateInr : 0;

  const handleContinue = () => {
    setShowSummary(true);
  };

  const handleProceedToPayment = () => {
    setShowSummary(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    startConversion();
  };

  const handleStartNew = () => {
    resetTransaction();
    setShowSummary(false);
    setShowPayment(false);
  };

  // Show success screen after transaction is confirmed
  if (conversionStatus === "CONFIRMED") {
    return (
      <div style={{ maxWidth: "420px", margin: "60px auto" }}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              ✓
            </div>
            <Text.Title style={{ marginBottom: "8px" }}>
              Transaction Successful!
            </Text.Title>
            <Text.Muted style={{ marginBottom: "24px" }}>
              Your tokens have been credited
            </Text.Muted>

            <TransactionStatus />

            <Button onClick={handleStartNew} style={{ marginTop: "24px" }}>
              Start New Transaction
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show loading screen during transaction
  if (conversionStatus === "PENDING") {
    return (
      <div style={{ maxWidth: "420px", margin: "60px auto" }}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #f0f0f0",
                borderTop: "4px solid #000",
                borderRadius: "50%",
                margin: "0 auto 24px",
                animation: "spin 1s linear infinite",
              }}
            />
            <Text.Title style={{ marginBottom: "8px" }}>
              Processing Transaction
            </Text.Title>
            <Text.Muted>Please wait while we send your tokens...</Text.Muted>
            <TransactionStatus />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "620px", margin: "10px auto" }}>
      <Card>
        <Text.Title style={{ marginBottom: "24px" }}>
          Buy Stablecoins
        </Text.Title>

        <div style={{ marginBottom: "16px" }}>
          <Text.Label>Select Token</Text.Label>
          <StablecoinSelector />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Text.Label>Amount</Text.Label>
          <TokenAmountInput />
        </div>

        <RatePreview />

        <Button
          onClick={handleContinue}
          disabled={!selectedToken || !tokenAmount || tokenAmount <= 0}
          style={{ marginTop: "24px" }}
        >
          Continue to Payment
        </Button>

        <a
          onClick={() => window.history.back()}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            width: "100px",
            backgroundColor: "#f0f0f0",
            color: "#000",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Back
        </a>
      </Card>

      <SummaryCard
        open={showSummary}
        onClose={() => setShowSummary(false)}
        onConfirm={handleProceedToPayment}
        token={selectedToken}
        amount={tokenAmount}
        total={total}
      />

      <PaymentModal
        open={showPayment}
        amount={total}
        onClose={() => setShowPayment(false)}
        onConfirm={handlePaymentSuccess}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
