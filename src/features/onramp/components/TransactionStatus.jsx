import { useOnRampStore } from "../onrampStore";

export default function TransactionStatus() {
  const { conversionStatus, transactionHash } = useOnRampStore();

  if (conversionStatus === "IDLE") return null;

  if (conversionStatus === "LOADING") {
    return <p>Processing payment…</p>;
  }

  if (conversionStatus === "PENDING") {
    return (
      <p>
        Sending tokens on-chain…
        <br />
        Tx: {transactionHash?.slice(0, 10)}…
      </p>
    );
  }

  if (conversionStatus === "CONFIRMED") {
    return <p>✅ Tokens credited successfully</p>;
  }

  if (conversionStatus === "FAILED") {
    return <p>❌ Transaction failed</p>;
  }

  return null;
}