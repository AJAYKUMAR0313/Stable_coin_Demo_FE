import { useOnRampStore } from "../onrampStore";

export default function TokenAmountInput() {
  const { tokenAmount, setTokenAmount } = useOnRampStore();

  return (
    <div>
      <label>Amount</label>
      <input
        type="number"
        min="0"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </div>
  );
}