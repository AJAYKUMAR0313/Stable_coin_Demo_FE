import { create } from "zustand";
import { 
  fetchAvailableTokens, 
  fetchConversionRates,
  fetchSavedBankAccounts,
  executeWithdrawalRequest 
} from "./services";

export const useOfframpStore = create((set, get) => ({
  // Available tokens from wallet
  availableTokens: [],
  
  // Conversion rates (static data)
  conversionRates: {},
  
  // Saved bank accounts (static or localStorage)
  savedBankAccounts: [],
  
  // Form data
  selectedToken: null,
  amount: "",
  selectedBankAccount: null,
  newBankAccount: {
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    accountType: ""
  },
  
  // Withdrawal status
  withdrawalStatus: "IDLE", // IDLE | PROCESSING | SUCCESS | ERROR
  withdrawalResult: null,
  errorMessage: null,

  // Actions - Load data
  loadAvailableTokens: async () => {
    try {
      const tokens = await fetchAvailableTokens();
      const rates = await fetchConversionRates();
      set({ 
        availableTokens: tokens,
        conversionRates: rates
      });
    } catch (error) {
      console.error("Failed to load tokens:", error);
      set({ availableTokens: [] });
    }
  },

  loadSavedBankAccounts: async () => {
    try {
      const accounts = await fetchSavedBankAccounts();
      set({ savedBankAccounts: accounts });
    } catch (error) {
      console.error("Failed to load bank accounts:", error);
      set({ savedBankAccounts: [] });
    }
  },

  // Actions - Form setters
  selectToken: (token) => set({ selectedToken: token }),
  
  setAmount: (amount) => set({ amount }),
  
  selectBankAccount: (account) => set({ selectedBankAccount: account }),
  
  setNewBankAccount: (accountData) => set({ newBankAccount: accountData }),

  // Execute withdrawal
  executeWithdrawal: async () => {
    const { selectedToken, amount, selectedBankAccount } = get();

    set({ 
      withdrawalStatus: "PROCESSING",
      errorMessage: null,
      withdrawalResult: null
    });

    try {
      const result = await executeWithdrawalRequest({
        token: selectedToken.symbol,
        amount: Number(amount),
        bankAccount: selectedBankAccount,
      });

      // Update token balance with new balance from result
      if (result.newBalance !== undefined) {
        set((state) => ({
          selectedToken: {
            ...state.selectedToken,
            balance: result.newBalance
          },
          availableTokens: state.availableTokens.map(token =>
            token.symbol === selectedToken.symbol
              ? { ...token, balance: result.newBalance }
              : token
          )
        }));
      }

      set({
        withdrawalStatus: "SUCCESS",
        withdrawalResult: result,
      });
    } catch (error) {
      console.error("Withdrawal failed:", error);
      set({
        withdrawalStatus: "ERROR",
        errorMessage: error.message || "Withdrawal failed. Please try again.",
      });
    }
  },

  // Reset withdrawal state
  resetWithdrawal: () => {
    set({
      selectedToken: null,
      amount: "",
      selectedBankAccount: null,
      newBankAccount: {
        accountHolder: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        accountType: ""
      },
      withdrawalStatus: "IDLE",
      withdrawalResult: null,
      errorMessage: null,
    });
  },
}));