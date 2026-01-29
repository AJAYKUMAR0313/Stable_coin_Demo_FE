import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

/**
 * Fetch available tokens from user's wallet
 * @returns {Promise<Array>} Array of token objects with balance
 */
export async function fetchAvailableTokens() {
  try {
    // Get user address from localStorage
    const userAddress = localStorage.getItem("address") || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    
    const response = await apiClient.get(ENDPOINTS.GET_WALLET_TOKENS, {
      params: { address: userAddress }
    });
    
    return response.data.tokens || [];
  } catch (error) {
    console.error("Error fetching available tokens:", error);
    
    // Fallback to demo data if API fails
    return [
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 1000.50,
        decimals: 6,
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        balance: 500.25,
        decimals: 6,
      },
      {
        symbol: "DAI",
        name: "Dai Stablecoin",
        balance: 250.75,
        decimals: 18,
      },
    ];
  }
}

/**
 * Execute a token transfer
 * @param {Object} transferData - Transfer details
 * @param {string} transferData.from - Sender wallet address
 * @param {string} transferData.to - Recipient wallet address
 * @param {string} transferData.tokenSymbol - Token symbol (e.g., "USDC")
 * @param {number} transferData.amount - Amount to transfer
 * @param {string} [transferData.note] - Optional note
 * @returns {Promise<Object>} Transfer result with transaction ID and new balance
 */
export async function executeTransferRequest({ from, to, tokenSymbol, amount, note }) {
  try {
    const response = await apiClient.post(ENDPOINTS.TRANSFER_TOKENS, {
      fromAddress: from,
      toAddress: to,
      token: tokenSymbol,
      amount: amount,
      note: note,
    });

    return {
      success: true,
      transactionId: response.data.transactionId || response.data.txHash,
    //   newBalance: response.data.newBalance,
    //   timestamp: response.data.timestamp || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Transfer request failed:", error);
    
    // Extract error message from API response
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error
      || error.message
      || "Transfer failed";

    throw new Error(errorMessage);
  }
}

/**
 * Validate a wallet address format (frontend validation)
 * @param {string} address - Wallet address to validate
 * @returns {boolean} True if valid format
 */
export function validateWalletAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Optional: Verify if recipient address exists on backend
 * @param {string} address - Wallet address to verify
 * @returns {Promise<boolean>} True if address exists
 */
export async function verifyRecipientAddress(address) {
  try {
    const response = await apiClient.get(ENDPOINTS.VERIFY_ADDRES(address));
    return response.data.exists || false;
  } catch (error) {
    console.error("Address verification failed:", error);
    // If verification fails, we still allow the transfer (backend will validate)
    return true;
  }
}