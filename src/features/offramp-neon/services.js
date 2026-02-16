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
  return {
    USDC: { rateInr: 83.5 },
    USDT: { rateInr: 83.45 },
    DAI: { rateInr: 83.4 },
    ETH: { rateInr: 210000 },
  };
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
    const userAddress = localStorage.getItem("wallet_address");

    if (!userAddress) {
      throw new Error("Wallet address not found");
    }

    const url =
      import.meta.env.VITE_API_BASE_URL + "wallet/admin-wallet" ||
      "http://localhost:8000/wallet/admin-wallet";

    // 1️⃣ Fetch admin wallet directly
    const walletRes = await apiClient.get(url, {
      params: { user_wallet_address: userAddress },
    });

    console.log("Admin wallet response:", walletRes.data);
    const mainWallet = walletRes.data.address;

    // 2️⃣ Transfer request
    const response = await apiClient.post("/wallet/transfer", {
      from_address: userAddress,
      to_address: mainWallet,
      amount: amount,
      asset: token,
    });

    return {
      success: response.data.success,
      transactionHash: response.data.tx_hash,
    };

  } catch (error) {
    console.error("Withdrawal request failed:", error);

    const errorMessage =
      error.response?.data?.detail?.[0]?.msg ||
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Withdrawal failed";

    throw new Error(errorMessage);
  }
}

