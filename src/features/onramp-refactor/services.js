import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

export async function fetchSupportedStablecoins() {
  // Demo-only static data with individual rates
  return [
    {
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      rateInr: 83.50,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      rateInr: 83.45,
    },
    {
        symbol: "JPM",
        name: "JPM Coin",
        decimals: 6,
        rateInr: 92.55,
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      rateInr: 83.40,
    }
  ];
}

export async function fetchUserBalance() {
  // Mock API call - replace with real endpoint
  const res = await apiClient.get(ENDPOINTS.USER_BALANCE(localStorage.getItem("customerId")));
  // return res.data;
  return {
    balance: res.data.fiat_bank_balance ,
    account:{
      number: res.data.bank_account_number,
      type: "Savings Account"
    }, // Assuming balance is in cents
  }
  
  // {  "bank_account_number": "45892000123456",  "fiat_bank_balance": 170000000 }
  // Demo data
  // return {
  //   balance: 45230.00,
  //   account: {
  //     number: "XXXX XXXX XXXX 4738",
  //     type: "Savings Account"
  //   }
  // };
}

export async function buyStablecoins({ address, tokenSymbol, tokenAmount, pin }) {
  const res = await apiClient.post(ENDPOINTS.BUY_STABLECOINS, {
    type: tokenSymbol,
    amount: tokenAmount,
    address: address,
    // pin: pin,
  });
  return res.data;
}