import { create } from "zustand";
import { fetchAvailableTokens, executeTransferRequest } from "./services";

export const useTransferStore = create((set, get) => ({
  // Form data
  recipient: "",
  amount: "",
  selectedToken: null,
  note: "",

  // Available tokens from wallet
  availableTokens: [],

  // Transfer status
  transferStatus: "IDLE", // IDLE | PROCESSING | SUCCESS | ERROR
  transferResult: null,
  errorMessage: null,

  // Actions - Form setters
  setRecipient: (recipient) => set({ recipient }),
  
  setAmount: (amount) => set({ amount }),
  
  selectToken: (token) => set({ selectedToken: token }),
  
  setNote: (note) => set({ note }),

  // Load available tokens from wallet
  loadAvailableTokens: async () => {
    try {
      const tokens = await fetchAvailableTokens();
      set({ availableTokens: tokens });
    } catch (error) {
      console.error("Failed to load tokens:", error);
      set({ availableTokens: [] });
    }
  },

  // Execute the transfer
  executeTransfer: async () => {
    const { recipient, amount, selectedToken, note } = get();

    set({ 
      transferStatus: "PROCESSING",
      errorMessage: null,
      transferResult: null
    });

    try {
      const result = await executeTransferRequest({
        from: localStorage.getItem("wallet_address") ,
        to: recipient,
        tokenSymbol: selectedToken.symbol,
        amount: Number(amount),
        note: note || "",
      });

      // Update the selected token balance with new balance from backend
      if (result.newBalance !== undefined) {
        set((state) => ({
          selectedToken: {
            ...state.selectedToken,
            balance: result.newBalance
          }
        }));
      }

      set({
        transferStatus: "SUCCESS",
        transferResult: result,
      });
    } catch (error) {
      console.error("Transfer failed:", error);
      set({
        transferStatus: "ERROR",
        errorMessage: error.message || "Transfer failed. Please try again.",
      });
    }
  },

  // Reset transfer state
  resetTransfer: () => {
    set({
      recipient: "",
      amount: "",
      selectedToken: null,
      note: "",
      transferStatus: "IDLE",
      transferResult: null,
      errorMessage: null,
    });
  },
}));