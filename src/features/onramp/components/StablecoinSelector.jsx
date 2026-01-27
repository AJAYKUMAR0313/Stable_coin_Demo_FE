import { useOnRampStore } from "../onrampStore";

export default function StablecoinSelector() {
  const { stablecoins, selectedToken, selectToken } = useOnRampStore();

  return (
    <div>
      <label>Stablecoin</label>
      <select
        value={selectedToken?.symbol || ""}
        onChange={(e) =>
          selectToken(
            stablecoins.find((t) => t.symbol === e.target.value)
          )
        }
      >
        <option value="">Select token</option>
        {stablecoins.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}