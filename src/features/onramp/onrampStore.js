import { create } from "zustand";
import { fetchSupportedStablecoins, buyStablecoins } from "./services";

export const useOnRampStore = create((set, get) => ({
  stablecoins: [],
  selectedToken: null,
  tokenAmount: "",
  conversionStatus: "IDLE",
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

    const res = await buyStablecoins({
      tokenSymbol: selectedToken.symbol,
      tokenAmount: Number(tokenAmount),
      address: localStorage.getItem("address"),
    });

    set({
      transactionHash: res.txHash,
      conversionStatus: "CONFIRMED",
    });
  },
}));