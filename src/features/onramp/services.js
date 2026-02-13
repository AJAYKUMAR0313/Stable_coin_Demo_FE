import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export async function fetchSupportedStablecoins() {
  // CoinGecko IDs mapped to your tokens
  const COIN_IDS = {
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai",
    ETH: "ethereum",
  };

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(
    COIN_IDS
  ).join(",")}&vs_currencies=inr`;

  const response = await fetch(url);
  const prices = await response.json();

  return [
    {
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      rateInr: prices["usd-coin"]?.inr ?? 0,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      rateInr: prices["tether"]?.inr ?? 0,
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      rateInr: prices["dai"]?.inr ?? 0,
    }
    // },
    // {
    //   symbol: "ETH",
    //   name: "Ethereum",
    //   decimals: 18,
    //   rateInr: prices["ethereum"]?.inr ?? 0,
    // },
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