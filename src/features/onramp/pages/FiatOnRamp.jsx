import { useEffect } from "react";
import { useOnRampStore } from "../onrampStore";
import StablecoinSelector from "../components/StablecoinSelector";
import TokenAmountInput from "../components/TokenAmountInput";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import TransactionStatus from "../components/TransactionStatus";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";

export default function FiatOnRamp() {
  const {
    loadStablecoins,
    startConversion,
    conversionStatus,
    error,
  } = useOnRampStore();

  useEffect(() => {
    loadStablecoins();
  }, [loadStablecoins]);

  return (
    <div>
      <h2>Buy Stablecoins</h2>

      {error && <ErrorBanner message={error} />}

      <StablecoinSelector />
      <TokenAmountInput />
      <PaymentMethodSelector />

      <Button
        onClick={startConversion}
        disabled={conversionStatus === "LOADING"}
      >
        Buy Tokens
      </Button>

      <TransactionStatus />
    </div>
  );
}