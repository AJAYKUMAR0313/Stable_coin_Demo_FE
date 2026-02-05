import { create } from "zustand";
import { fetchSupportedStablecoins, fetchUserBalance, buyStablecoins } from "./services";

export const useOnRampStore = create((set, get) => ({
  // User account data
  userAccount: null,
  availableBalance: 0,

  // Token selection
  stablecoins: [],
  selectedToken: null,
  
  // Amount input
  tokenAmount: "",
  
  // Transaction state
  conversionStatus: "IDLE", // IDLE, PENDING, CONFIRMED
  transactionHash: null,
  
  // PIN validation
  pinError: null,
  pinAttempts: 0,

  // Load stablecoins on mount
  loadStablecoins: async () => {
    const data = await fetchSupportedStablecoins();
    set({ stablecoins: data });
  },

  // Fetch user balance
  loadUserBalance: async () => {
    const data = await fetchUserBalance();
    set({ 
      userAccount: data.account,
      availableBalance: data.balance 
    });
  },

  // Select token
  selectToken: (token) => set({ selectedToken: token }),
  
  // Set token amount with validation
  setTokenAmount: (amount) => {
    set({ tokenAmount: amount });
  },

  // Check if amount exceeds balance
  hasInsufficientBalance: () => {
    const { tokenAmount, selectedToken, availableBalance } = get();
    if (!tokenAmount || !selectedToken) return false;
    const totalInr = Number(tokenAmount) * selectedToken.rateInr;
    return totalInr > availableBalance;
  },

  // Validate PIN and start conversion
  startConversion: async (pin) => {
    const { selectedToken, tokenAmount, userAccount } = get();

    // Reset PIN error
    set({ pinError: null });

    // Mock PIN validation (replace with real API)
    if (pin !== "123456") {
      const attempts = get().pinAttempts + 1;
      set({ 
        pinError: `Invalid PIN (${3 - attempts} attempts left)`,
        pinAttempts: attempts 
      });
      
      if (attempts >= 3) {
        set({ pinError: "Too many failed attempts. Please try again later." });
      }
      return false;
    }

    // Set pending state
    set({ conversionStatus: "PENDING", pinError: null, pinAttempts: 0 });

    try {
          const res = await buyStablecoins({
            tokenSymbol: selectedToken.symbol,
            tokenAmount: Number(tokenAmount),
            address: localStorage.getItem("wallet_address"),
          });

        // console.log("buyStablecoins response:", res);
        // console.log("tx_hash:", res?.txHash);

      set({
        transactionHash: res.tx_hash,
        conversionStatus: "CONFIRMED",
      });
      
      return true;
    } catch (error) {
      console.error("Transaction failed:", error);
      set({
        conversionStatus: "IDLE",
        transactionHash: null,
        pinError: "Transaction failed. Please try again.",
      });
      return false;
    }
  },

  // Reset transaction
  resetTransaction: () => {
    set({
      selectedToken: null,
      tokenAmount: "",
      conversionStatus: "IDLE",
      transactionHash: null,
      pinError: null,
      pinAttempts: 0,
    });
  },
}));