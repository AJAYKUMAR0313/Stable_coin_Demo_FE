import { useEffect, useState } from "react";
import { useOnRampStore } from "../onrampStore";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import StablecoinSelector from "../components/StablecoinSelector";
import TokenAmountInput from "../components/TokenAmountInput";
import RatePreview from "../components/RatePreview";
import PaymentModal from "../components/PaymentModal";
import TransactionStatus from "../components/TransactionStatus";

export default function FiatOnRamp() {
  const {
    loadStablecoins,
    startConversion,
    selectedToken,
    tokenAmount,
  } = useOnRampStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadStablecoins();
  }, []);

  const total = tokenAmount * 83;

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto" }}>
      <Card>
        <Text.Title>Buy Stablecoins</Text.Title>

        <StablecoinSelector />
        <TokenAmountInput />
        <RatePreview />

        <Button
          onClick={() => setOpen(true)}
          disabled={!selectedToken || !tokenAmount}
        >
          Continue
        </Button>

        <PaymentModal
          open={open}
          amount={total}
          onConfirm={() => {
            setOpen(false);
            startConversion();
          }}
        />

        <TransactionStatus />
      </Card>
    </div>
  );
}