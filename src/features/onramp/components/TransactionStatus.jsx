import { useOnRampStore } from "../onrampStore";

export default function TransactionStatus() {
  const { conversionStatus, transactionHash } = useOnRampStore();

  if (conversionStatus === "PENDING")
    return <p>Sending tokens… {transactionHash}</p>;

  if (conversionStatus === "CONFIRMED")
    return <p>✓ Tokens credited</p>;

  return null;
}