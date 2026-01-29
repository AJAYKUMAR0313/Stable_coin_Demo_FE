import { useState } from "react";
import { useTransferStore } from "../transferStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import RecipientInput from "./RecipientInput";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import BalanceDisplay from "./BalanceDisplay";

export default function TransferForm({ onContinue }) {
  const { recipient, setRecipient, selectedToken, amount, note, setNote } = useTransferStore();
  
  const [recipientError, setRecipientError] = useState(null);
  const [amountError, setAmountError] = useState(null);

  const isFormValid = () => {
    return (
      recipient &&
      !recipientError &&
      selectedToken &&
      amount &&
      Number(amount) > 0 &&
      !amountError
    );
  };

  const handleContinue = () => {
    // Final validation before proceeding
    if (isFormValid()) {
      onContinue();
    }
  };

  return (
    <Card>
      <Text.Title style={{ marginBottom: "32px", fontSize: "24px" }}>
        Transfer Details
      </Text.Title>

      {/* Recipient Input */}
      <RecipientInput
        value={recipient}
        onChange={setRecipient}
        error={recipientError}
        setError={setRecipientError}
      />

      {/* Token Selector */}
      <TokenSelector />

      {/* Amount Input */}
      <AmountInput
        error={amountError}
        setError={setAmountError}
      />

      {/* Balance Display */}
      <BalanceDisplay />

      {/* Optional Note */}
      <div style={{ marginBottom: "32px" }}>
        <Text.Label style={{ marginBottom: "12px", display: "block", fontSize: "15px" }}>
          Note (Optional)
        </Text.Label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note for this transfer..."
          maxLength={200}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "15px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            outline: "none",
            resize: "vertical",
            minHeight: "100px",
            fontFamily: "inherit",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#000"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "4px"
        }}>
          <Text.Muted style={{ fontSize: "12px" }}>
            {note.length}/200
          </Text.Muted>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!isFormValid()}
      >
        Continue to Review
      </Button>

      {/* Helper Text */}
      {!isFormValid() && (
        <Text.Muted style={{ marginTop: "12px", textAlign: "center", fontSize: "13px" }}>
          {!recipient && "Enter recipient address"}
          {recipient && recipientError && "Fix recipient address"}
          {recipient && !recipientError && !selectedToken && " • Select a token"}
          {recipient && !recipientError && selectedToken && !amount && " • Enter amount"}
          {recipient && !recipientError && selectedToken && amount && amountError && " • Fix amount"}
        </Text.Muted>
      )}
    </Card>
  );
}