import { create } from "zustand";
import {
  fetchSupportedStablecoins,
  buyStablecoins,
} from "./services";

const INITIAL_STATE = {
  stablecoins: [],
  selectedToken: null,

  tokenAmount: "",
  paymentMethod: null,

  conversionStatus: "IDLE", // IDLE | LOADING | PENDING | CONFIRMED | FAILED
  transactionId: null,
  transactionHash: null,

  loading: false,
  error: null,
};

export const useOnRampStore = create((set, get) => ({
  ...INITIAL_STATE,

  /* -------------------------------
     Catalog
  -------------------------------- */

  loadStablecoins: async () => {
    try {
      set({ loading: true, error: null });
      const tokens = await fetchSupportedStablecoins();
      set({ stablecoins: tokens, loading: false });
    } catch (err) {
      set({
        error: err.message || "Failed to load stablecoins",
        loading: false,
      });
    }
  },

  selectToken: (token) => {
    set({
      selectedToken: token,
      tokenAmount: "",
      error: null,
    });
  },

  setTokenAmount: (amount) => {
    set({ tokenAmount: amount, error: null });
  },

  selectPaymentMethod: (method) => {
    set({ paymentMethod: method, error: null });
  },

  /* -------------------------------
     Conversion
  -------------------------------- */

  startConversion: async () => {
    const { selectedToken, tokenAmount, paymentMethod } = get();

    if (!selectedToken) {
      set({ error: "Stablecoin not selected" });
      return;
    }

    if (!tokenAmount || Number(tokenAmount) <= 0) {
      set({ error: "Invalid token amount" });
      return;
    }

    if (!paymentMethod) {
      set({ error: "Payment method not selected" });
      return;
    }

    try {
      set({
        conversionStatus: "LOADING",
        error: null,
      });

      // Payment is mocked as successful
      const response = await buyStablecoins({
        tokenSymbol: selectedToken.symbol,
        tokenAmount: Number(tokenAmount),
        paymentMethod,
      });

      set({
        conversionStatus: "PENDING",
        transactionId: response.transactionId,
        transactionHash: response.txHash,
      });
    } catch (err) {
      set({
        conversionStatus: "FAILED",
        error: err.message || "Conversion failed",
      });
    }
  },

  /* -------------------------------
     Status Updates
  -------------------------------- */

  markConfirmed: () => {
    set({ conversionStatus: "CONFIRMED" });
  },

  markFailed: (message) => {
    set({
      conversionStatus: "FAILED",
      error: message || "Transaction failed",
    });
  },

  /* -------------------------------
     Reset
  -------------------------------- */

  resetOnRamp: () => {
    set({ ...INITIAL_STATE });
  },
}));