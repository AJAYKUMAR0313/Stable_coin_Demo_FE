import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";
import { useEffect,useState } from "react";

const EXTERNAL_WITHDRAW_ADDRESS =
  import.meta.env.VITE_MAIN_WALLET_ADDRESS ||
  "0x2a3a0E48B4A81cf64A956e1F7773CAc463f0Df43";

/**
 * Fetch available tokens from user's wallet
 */
export async function fetchAvailableTokens() {
  try {
    const userAddress = localStorage.getItem("wallet_address");

    const response = await apiClient.get("/wallet/balance", {
      params: {
        wallet_address: userAddress,
      },
    });
    const balanceData = response.stablecoin;

    console.log("Fetched wallet balances:", balanceData);

    // stablecoins is already a list of objects
    return response.data.stablecoins || [];
  } catch (error) {
    console.error("Error fetching available tokens:", error);

    // fallback shape stays the same
    return [
      { symbol: "USDC", balance: 0 },
      { symbol: "USDT", balance: 0 },
    ];
  }
}

/**
 * Get conversion rates
 */
export async function fetchConversionRates() {
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

  const result = {};

  for (const [symbol, id] of Object.entries(COIN_IDS)) {
    result[symbol] = {
      rateInr: prices[id]?.inr ?? 0,
    };
  }

  return result;
}

/**
 * Fetch connected bank account from bank app
 */
export async function fetchConnectedBankAccount() {
  // Mock - In real app, this comes from bank app context
  const res = await apiClient.get(
    ENDPOINTS.USER_BALANCE(localStorage.getItem("customerId")),
  );
  // return res.data;
  return {
    number: "****" + res.data.bank_account_number.slice(-4),
    type: "Savings Account",
    fullNumber: res.data.bank_account_number,
  };
}
// account:{
//   number: res.data.bank_account_number,
//   type: "Savings Account"
// }, // Assuming balance is in cents
// }
//
// return {
//   number: "****4738",
//   type: "Savings Account",
//   fullNumber: "1234567890124738"
// };
// }

/**
 * Execute withdrawal request
 */
export async function executeWithdrawalRequest({
  token,
  amount,
  bankAccount,
  pin,
}) {
  try {
    // 1️⃣ Validate inputs early
    if (!token || !amount) {
      throw new Error("Token and amount are required");
    }

    const userAddress = localStorage.getItem("wallet_address");
    if (!userAddress) {
      throw new Error("Wallet address not found");
    }

    // 2️⃣ Proper base URL fallback
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/";

    // Ensure trailing slash safety
    const adminWalletUrl = `${baseUrl.replace(/\/$/, "")}/wallet/admin-wallet`;

    // 3️⃣ Fetch admin wallet
    console.log("Fetching admin wallet...");
    const walletRes = await apiClient.get(adminWalletUrl, {
      params: { user_wallet_address: userAddress },
    });

    const mainWallet = walletRes?.data?.address;

    if (!mainWallet) {
      throw new Error("Admin wallet address not found");
    }

    console.log("Admin wallet:", mainWallet);

    // 4️⃣ Execute withdrawal transfer
    console.log("Initiating withdrawal transfer...");
    const response = await apiClient.post("/wallet/transfer", {
      from_address: userAddress,
      to_address: mainWallet,
      amount: Number(amount),
      asset: token,
      bank_account: bankAccount,
      pin, // backend should validate this
    });

    return {
      success: response?.data?.success ?? true,
      transactionHash: response?.data?.tx_hash ?? null,
    };
  } catch (error) {
    console.error("Withdrawal request failed:", error);

    const message =
      error?.response?.data?.detail?.[0]?.msg ??
      error?.response?.data?.detail ??
      error?.response?.data?.message ??
      error?.message ??
      "Withdrawal failed";

    throw new Error(message);
  }
}


