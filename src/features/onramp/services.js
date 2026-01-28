import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export async function fetchSupportedStablecoins() {
  // 🔹 Demo-only static data with individual rates
  return [
    {
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      rateInr: 83.50, // Rate per token in INR
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      rateInr: 83.45, // Rate per token in INR
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      rateInr: 83.40, // Rate per token in INR
    },
  ];
}

export async function buyStablecoins({ address, tokenSymbol, tokenAmount }) {
  const res = await apiClient.post(ENDPOINTS.BUY_STABLECOINS, {
    type: tokenSymbol,
    amount: tokenAmount,
    address: address,
  });
  return res.data;
}