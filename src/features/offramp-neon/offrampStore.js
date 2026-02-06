import { create } from "zustand";
import { 
  fetchAvailableTokens, 
  fetchConversionRates,
  fetchConnectedBankAccount,
  executeWithdrawalRequest 
} from "./services";

export const useOfframpStore = create((set, get) => ({
  // Available tokens from wallet
  availableTokens: [],
  
  // Conversion rates
  conversionRates: {},
  
  // Connected bank account (auto-fetched from bank app)
  connectedAccount: null,
  
  // Form data
  selectedToken: null,
  amount: "",
  
  // PIN state
  pin: ["", "", "", "", "", ""],
  pinError: null,
  pinAttempts: 0,
  showPinModal: false,
  
  // Withdrawal status
  withdrawalStatus: "IDLE", // IDLE | PROCESSING | SUCCESS | ERROR
  withdrawalResult: null,
  errorMessage: null,

  // UI state
  tokenDrawerOpen: false,
  isSliding: false,
  slideProgress: 0,

  // Load data
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

  loadConnectedAccount: async () => {
    try {
      const account = await fetchConnectedBankAccount();
      set({ connectedAccount: account });
    } catch (error) {
      console.error("Failed to load bank account:", error);
    }
  },

  // Form actions
  selectToken: (token) => set({ selectedToken: token }),
  
  setAmount: (amount) => set({ amount }),

  setMaxAmount: () => {
    const { selectedToken } = get();
    if (selectedToken) {
      set({ amount: selectedToken.balance.toString() });
    }
  },

  // Token drawer
  openTokenDrawer: () => set({ tokenDrawerOpen: true }),
  closeTokenDrawer: () => set({ tokenDrawerOpen: false }),

  // Slider
  setSlideProgress: (progress) => set({ slideProgress: progress }),
  setIsSliding: (isSliding) => set({ isSliding }),

  // PIN modal
  openPinModal: () => set({ showPinModal: true, pin: ["", "", "", "", "", ""], pinError: null }),
  closePinModal: () => set({ showPinModal: false, pin: ["", "", "", "", "", ""], pinError: null }),

  setPin: (index, value) => {
    const newPin = [...get().pin];
    newPin[index] = value;
    set({ pin: newPin });
  },

  clearPin: () => set({ pin: ["", "", "", "", "", ""] }),

  // Execute withdrawal with PIN validation
  executeWithdrawal: async () => {
    const { selectedToken, amount, connectedAccount, pin } = get();
    const pinString = pin.join("");

    // Reset error
    set({ pinError: null });

    // Mock PIN validation (replace with real API)
    if (pinString !== "123456") {
      const attempts = get().pinAttempts + 1;
      set({ 
        pinError: `Invalid PIN (${3 - attempts} attempts left)`,
        pinAttempts: attempts,
        pin: ["", "", "", "", "", ""]
      });
      
      if (attempts >= 3) {
        set({ pinError: "Too many failed attempts. Please try again later." });
      }
      return false;
    }

    // Close PIN modal and start processing
    set({ 
      showPinModal: false,
      withdrawalStatus: "PROCESSING",
      errorMessage: null,
      withdrawalResult: null,
      pinAttempts: 0
    });

    try {
      const result = await executeWithdrawalRequest({
        token: selectedToken.symbol,
        amount: Number(amount),
        bankAccount: connectedAccount,
        pin: pinString,
      });

      set({
        withdrawalStatus: "SUCCESS",
        withdrawalResult: result,
      });
      
      return true;
    } catch (error) {
      console.error("Withdrawal failed:", error);
      set({
        withdrawalStatus: "ERROR",
        errorMessage: error.message || "Withdrawal failed. Please try again.",
      });
      return false;
    }
  },

  // Reset
  resetWithdrawal: () => {
    set({
      selectedToken: null,
      amount: "",
      pin: ["", "", "", "", "", ""],
      pinError: null,
      pinAttempts: 0,
      showPinModal: false,
      withdrawalStatus: "IDLE",
      withdrawalResult: null,
      errorMessage: null,
      slideProgress: 0,
      isSliding: false,
    });
  },

  // Validation
  hasInsufficientBalance: () => {
    const { amount, selectedToken } = get();
    if (!amount || !selectedToken) return false;
    return Number(amount) > selectedToken.balance;
  },

  isAmountValid: () => {
    const { amount, selectedToken } = get();
    if (!amount || !selectedToken) return false;
    const numAmount = Number(amount);
    return numAmount > 0 && numAmount >= 10 && numAmount <= selectedToken.balance;
  },

  canSlide: () => {
    const { selectedToken, amount } = get();
    return selectedToken && get().isAmountValid();
  },
}));