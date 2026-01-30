import apiClient from "@/services/apiClient";

// Fixed external address where all withdrawals go
const EXTERNAL_WITHDRAW_ADDRESS = "0xF016E366a65430E9f4Ec75E13bB4D7Cb57E14EFF";

/**
 * Fetch available tokens from user's wallet
 * Uses the same balance endpoint as transfer feature
 */
export async function fetchAvailableTokens() {
  try {
    const userAddress = localStorage.getItem("wallet_address") || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    
    // Call the balance endpoint
    const response = await apiClient.get(`/wallet/balance/${userAddress}`);
    
    const balanceData = response.data;
    
    // Transform the balance response into token array
    const tokens = [];
    
    // Add ETH if balance > 0
    if (balanceData.balance_eth > 0) {
      tokens.push({
        symbol: "ETH",
        name: "Ethereum",
        balance: balanceData.balance_eth,
        decimals: 18,
      });
    }
    
    // Add USDC if balance > 0
    if (balanceData.balance_usdc > 0) {
      tokens.push({
        symbol: "USDC",
        name: "USD Coin",
        balance: balanceData.balance_usdc,
        decimals: 6,
      });
    }
    
    // Return tokens (only those with balance > 0)
    return tokens.length > 0 ? tokens : [
      // If no tokens, show demo token
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 0,
        decimals: 6,
      },
    ];
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
        symbol: "ETH",
        name: "Ethereum",
        balance: 0.5,
        decimals: 18,
      },
    ];
  }
}

/**
 * Get conversion rates (static data)
 * In real app, this could be an API call to get live rates
 */
export async function fetchConversionRates() {
  // Static conversion rates
  return {
    "USDC": { rateInr: 83.50 },
    "USDT": { rateInr: 83.45 },
    "DAI": { rateInr: 83.40 },
    "ETH": { rateInr: 83.35 }
  };
}

/**
 * Get saved bank accounts (static data or from localStorage)
 */
export async function fetchSavedBankAccounts() {
  // Check localStorage first
  const savedAccounts = localStorage.getItem("savedBankAccounts");
  if (savedAccounts) {
    try {
      return JSON.parse(savedAccounts);
    } catch (error) {
      console.error("Error parsing saved bank accounts:", error);
    }
  }

  // Return static demo bank accounts
  const demoAccounts = [
    {
      id: "bank_1",
      accountHolder: "John Doe",
      accountNumber: "1234567890",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      accountType: "Savings"
    },
    {
      id: "bank_2",
      accountHolder: "John Doe",
      accountNumber: "9876545678",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      accountType: "Current"
    }
  ];

  // Save to localStorage for future use
  localStorage.setItem("savedBankAccounts", JSON.stringify(demoAccounts));
  
  return demoAccounts;
}

/**
 * Execute withdrawal - Actually calls transfer API to fixed address
 * @param {Object} withdrawalData
 * @param {string} withdrawalData.token - Token symbol (USDC, ETH, etc.)
 * @param {number} withdrawalData.amount - Amount to withdraw
 * @param {Object} withdrawalData.bankAccount - Bank account details (for display only)
 */
export async function executeWithdrawalRequest({ token, amount, bankAccount }) {
  try {
    const userAddress = localStorage.getItem("wallet_address") || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

    // Call the transfer API
    // Frontend shows "withdrawal to bank" but backend transfers to fixed address
    const response = await apiClient.post("/wallet/transfer", {
      from_address: userAddress,
      to_address: EXTERNAL_WITHDRAW_ADDRESS, // Fixed external address
      amount: amount,
      asset: token
    });

    // The API returns a transaction hash string
    const transactionHash = response.data;

    // Calculate new balance (optimistic update)
    // In real app, you'd fetch fresh balance from API
    const currentTokens = await fetchAvailableTokens();
    const currentToken = currentTokens.find(t => t.symbol === token);
    const newBalance = currentToken ? (currentToken.balance - amount) : 0;

    return {
      success: true,
      transactionHash: transactionHash,
      newBalance: newBalance,
      estimatedDays: 3, // Fake timeline for display
      bankAccount: bankAccount // Pass through for display
    };
  } catch (error) {
    console.error("Withdrawal request failed:", error);
    
    // Extract error message from API response
    const errorMessage = error.response?.data?.detail?.[0]?.msg
      || error.response?.data?.detail
      || error.response?.data?.message 
      || error.response?.data?.error
      || error.message
      || "Withdrawal failed";

    throw new Error(errorMessage);
  }
}

/**
 * Save a new bank account to localStorage
 * @param {Object} bankAccount - Bank account details
 */
export async function saveBankAccount(bankAccount) {
  try {
    const existingAccounts = await fetchSavedBankAccounts();
    
    const newAccount = {
      id: `bank_${Date.now()}`,
      ...bankAccount
    };

    const updatedAccounts = [...existingAccounts, newAccount];
    
    localStorage.setItem("savedBankAccounts", JSON.stringify(updatedAccounts));
    
    return newAccount;
  } catch (error) {
    console.error("Error saving bank account:", error);
    throw error;
  }
}