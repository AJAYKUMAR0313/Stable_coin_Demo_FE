import { create } from "zustand";
import { fetchSupportedStablecoins, buyStablecoins } from "./services";

export const useOnRampStore = create((set, get) => ({
  stablecoins: [],
  selectedToken: null,
  tokenAmount: "",
  conversionStatus: "IDLE", // IDLE, PENDING, CONFIRMED
  transactionHash: null,
  loadStablecoins: async () => {
    const data = await fetchSupportedStablecoins();
    set({ stablecoins: data });
  },

  selectToken: (token) => set({ selectedToken: token }),
  
  setTokenAmount: (amount) => set({ tokenAmount: amount }),

  startConversion: async () => {
    const { selectedToken, tokenAmount } = get();

    set({ conversionStatus: "PENDING" });

    try {
      const res = await buyStablecoins({
        tokenSymbol: selectedToken.symbol,
        tokenAmount: Number(tokenAmount),
        address: localStorage.getItem("wallet_address"),
      });

      set({
        transactionHash: res.tx_hash,
        conversionStatus: "CONFIRMED",
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      set({
        conversionStatus: "IDLE",
        transactionHash: null,
      });
    }
  },

  resetTransaction: () => {
    set({
      selectedToken: null,
      tokenAmount: "",
      conversionStatus: "IDLE",
      transactionHash: null,
    });
  },
}));