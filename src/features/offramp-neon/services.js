import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

const EXTERNAL_WITHDRAW_ADDRESS = import.meta.env.VITE_MAIN_WALLET_ADDRESS || "0x2a3a0E48B4A81cf64A956e1F7773CAc463f0Df43";

/**
 * Fetch available tokens from user's wallet
 */
export async function fetchAvailableTokens() {
  try {
    const userAddress = localStorage.getItem("wallet_address");
    
    const response = await apiClient.get("/wallet/balance", {
    params: {
      wallet_address:userAddress,
    },
});
    const balanceData = response.stablecoin ;

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
    "USDC": { rateInr: 83.50 },
    "USDT": { rateInr: 83.45 },
    "DAI": { rateInr: 83.40 },
    "ETH": { rateInr: 210000 }
  };
}

/**
 * Fetch connected bank account from bank app
 */
export async function fetchConnectedBankAccount() {
  // Mock - In real app, this comes from bank app context
  const res = await apiClient.get(ENDPOINTS.USER_BALANCE(localStorage.getItem("customerId")));
    // return res.data;
    return {
      number: "****" + res.data.bank_account_number.slice(-4),
      type: "Savings Account",
      fullNumber: res.data.bank_account_number
    }
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
export async function executeWithdrawalRequest({ token, amount, bankAccount, pin }) {
  try {
    const userAddress = localStorage.getItem("wallet_address") || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

    const response = await apiClient.post("/wallet/transfer", {
      from_address: userAddress,
      to_address: EXTERNAL_WITHDRAW_ADDRESS,
      amount: amount,
      asset: token,
      // PIN validation happens on backend
    });

    const transactionHash = response.data.tx_hash;

    return {
      success: response.data.success,
      transactionHash: transactionHash,
      // estimatedDays: 2,
      // bankAccount: bankAccount
    };
  } catch (error) {
    console.error("Withdrawal request failed:", error);
    
    const errorMessage = error.response?.data?.detail?.[0]?.msg
      || error.response?.data?.detail
      || error.response?.data?.message 
      || error.response?.data?.error
      || error.message
      || "Withdrawal failed";

    throw new Error(errorMessage);
  }
}