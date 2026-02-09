import { create } from "zustand";
import { fetchAvailableTokens, executeTransferRequest } from "./services";
import axios from "axios";

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

  payees: [],
  payeesLoading: false,

  loadPayees: async (customerId) => {
    set({ payeesLoading: true });
    try {
      const res = await fetch(`http://localhost:8000/bank_details/payees/${customerId}`);
      console.log("Response:", res);
      const data = await res.json();
      console.log("Loaded payees:", data);
      set({ payees: data || [] });
    } catch (e) {
      console.error("Failed to load payees", e);
      set({ payees: [] });
    } finally {
      set({ payeesLoading: false });
    }
  },

  addPayee: async (customerId, payload) => {
    await fetch(`http://localhost:8000/bank_details/payee/customer_id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    // 👇 THIS is your refreshPayees
    await get().loadPayees(customerId);
  },

  deletePayee: async (customerId, payeeId) => {
    try {
      await axios.delete(`http://localhost:8000/bank_details/payee/payee_id`,{
        params: { customer_id: customerId,
          payee_id: payeeId
        },
      });
      // await get().loadPayees(customerId);
    } catch (e) {
      console.error("Failed to delete payee", e);
    }
  },
}));
