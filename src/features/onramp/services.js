import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export async function fetchSupportedStablecoins() {
  // 🔹 Demo-only static data
  return [
    {
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
    },
  ];
}

export async function buyStablecoins({ address,tokenSymbol, tokenAmount }) {
  const res = await apiClient.post(ENDPOINTS.BUY_STABLECOINS, {
    type: tokenSymbol,
    amount:tokenAmount,
    address: address,
  });
  return res.data;
}