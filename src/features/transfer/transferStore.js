import { create } from "zustand";
import { fetchAvailableTokens, executeTransferRequest } from "./services";

export const useTransferStore = create((set, get) => ({
  /* =========================
     TRANSFER MODE
     ========================= */
  transferMode: "WALLET", // WALLET | PAYEE | SEARCH

  /* =========================
     FORM DATA
     ========================= */
  recipient: "",
  amount: "",
  selectedToken: null,
  note: "",
  isCheckingRecipient: false,

  /* =========================
     PAYEE / SEARCH STATE
     ========================= */
  selectedPayee: null,
  searchedUser: null,

  /* =========================
     WALLET TOKENS
     ========================= */
  availableTokens: [],

  /* =========================
     TRANSFER STATUS
     ========================= */
  transferStatus: "IDLE", // IDLE | PROCESSING | SUCCESS | ERROR
  transferResult: null,
  errorMessage: null,

  /* =========================
     SETTERS
     ========================= */

  setTransferMode: (mode) =>
    set({
      transferMode: mode,
      recipient: "",
      amount: "",
      selectedToken: null,
      note: "",
      selectedPayee: null,
      searchedUser: null,
    }),

  setRecipient: (recipient) => {
    // 🔥 AUTO-CLEAR ALL WHEN RECIPIENT CLEARED
    if (!recipient) {
      set({
        recipient: "",
        amount: "",
        selectedToken: null,
        note: "",
        selectedPayee: null,
        searchedUser: null,
        recipientError: null,
        isCheckingRecipient: false,
      });
    } else {
      set({ recipient, recipientError: null, isCheckingRecipient: true });
    }
  },

  setAmount: (amount) => set({ amount }),

  selectToken: (token) => set({ selectedToken: token }),

  setNote: (note) => set({ note }),

  setRecipientError: (error) => set({ recipientError: error }),

  setCheckingRecipient: (value) => set({ isCheckingRecipient: value }),

  /* =========================
     PAYEE / SEARCH HANDLERS
     ========================= */

  setRecipientFromPayee: (payee) =>
    set({
      recipient: payee.wallet_address,
      selectedPayee: payee,
      searchedUser: null,
    }),

  setRecipientFromSearch: (user) =>
    set({
      recipient: user.wallet_address,
      searchedUser: user,
      selectedPayee: null,
    }),

  /* =========================
     LOAD TOKENS
     ========================= */
  loadAvailableTokens: async () => {
    try {
      const tokens = await fetchAvailableTokens();
      set({ availableTokens: tokens });
    } catch (error) {
      console.error("Failed to load tokens:", error);
      set({ availableTokens: [] });
    }
  },

  /* =========================
     EXECUTE TRANSFER
     ========================= */
  executeTransfer: async () => {
    const { recipient, amount, selectedToken, note } = get();

    set({
      transferStatus: "PROCESSING",
      errorMessage: null,
      transferResult: null,
    });

    try {
      const result = await executeTransferRequest({
        from: localStorage.getItem("wallet_address"),
        to: recipient,
        tokenSymbol: selectedToken.symbol,
        amount: Number(amount),
        note: note || "",
      });

      if (result.newBalance !== undefined) {
        set((state) => ({
          selectedToken: {
            ...state.selectedToken,
            balance: result.newBalance,
          },
        }));
      }

      set({
        transferStatus: "SUCCESS",
        transferResult: result,
      });
    } catch (error) {
      set({
        transferStatus: "ERROR",
        errorMessage: error.message || "Transfer failed. Please try again.",
      });
    }
  },

  /* =========================
     RESET
     ========================= */
  resetTransfer: () =>
    set({
      transferMode: "WALLET",
      recipient: "",
      amount: "",
      selectedToken: null,
      note: "",
      selectedPayee: null,
      searchedUser: null,
      transferStatus: "IDLE",
      transferResult: null,
      errorMessage: null,
    }),
}));
