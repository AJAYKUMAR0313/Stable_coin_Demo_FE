import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

// export async function fetchSupportedStablecoins() {
//   // Demo-only static data with individual rates
//   return [
//     {
//       symbol: "USDC",
//       name: "USD Coin",
//       decimals: 6,
//       rateInr: 83.50,
//     },
//     {
//       symbol: "USDT",
//       name: "Tether USD",
//       decimals: 6,
//       rateInr: 83.45,
//     },
//     {
//         symbol: "JPM",
//         name: "JPM Coin",
//         decimals: 6,
//         rateInr: 92.55,
//     },
//     {
//       symbol: "DAI",
//       name: "Dai Stablecoin",
//       decimals: 18,
//       rateInr: 83.40,
//     }
//   ];
// }
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

export async function fetchUserBalance() {

  const customerId = localStorage.getItem("customerId");
  const tenantId = localStorage.getItem("tenantId");

  const res = await apiClient.get(
    ENDPOINTS.USER_BALANCE,   // endpoint without params
    {
      params: {
        customer_id: customerId,
        tenant_id: tenantId
      }
    }
  );

  return {
    balance: res.data.fiat_bank_balance,
    account: {
      number: res.data.bank_account_number,
      type: "Savings Account"
    }
  };
}


export async function buyStablecoins({ address, tokenSymbol, tokenAmount, pin }) {
  const res = await apiClient.post(
    ENDPOINTS.BUY_STABLECOINS,
    null, // no body
    {
      params: {
        address,
        type: tokenSymbol,
        amount: tokenAmount,
        // pin,
      },
    }
  );

  return res.data;
}
