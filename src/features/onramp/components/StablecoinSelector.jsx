import { useOnRampStore } from "../onrampStore";

export default function StablecoinSelector() {
  const { stablecoins, selectedToken, selectToken } = useOnRampStore();

  return (
    <select
      value={selectedToken?.symbol || ""}
      onChange={(e) =>
        selectToken(stablecoins.find(t => t.symbol === e.target.value))
      }
    >
      <option value="">Select token</option>
      {stablecoins.map(t => (
        <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
      ))}
    </select>
  );
}