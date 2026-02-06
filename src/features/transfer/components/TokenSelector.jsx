import { useEffect } from "react";
import { useTransferStore } from "../transferStore";

export default function TokenSelector() {
  const {
    availableTokens,
    selectedToken,
    selectToken,
    loadAvailableTokens,
  } = useTransferStore();

  useEffect(() => {
    loadAvailableTokens();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {/* LABEL */}
      <label className="text-sm text-white/70">
        Select Token
      </label>

      {/* SELECT */}
      <div className="relative">
        <select
          value={selectedToken?.symbol || ""}
          onChange={(e) => {
            const token = availableTokens.find(
              (t) => t.symbol === e.target.value
            );
            selectToken(token || null);
          }}
          className="
            w-full px-3 py-2 pr-10 rounded-xl
            bg-white/10 backdrop-blur-md
            border border-white/15
            text-sm text-white
            focus:outline-none focus:ring-2 focus:ring-cyan-400/40
            cursor-pointer appearance-none
          "
        >
          <option value="" className="bg-[#071D3A] text-white">
            Choose a token
          </option>

          {availableTokens.map((token) => (
            <option
              key={token.symbol}
              value={token.symbol}
              className="bg-[#071D3A] text-white"
            >
              {token.symbol} — {token.name} ({token.balance})
            </option>
          ))}
        </select>

        {/* DROPDOWN ICON */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 pointer-events-none">
          ▼
        </span>
      </div>

      {/* SELECTED TOKEN INFO */}
      {selectedToken && (
        <div
          className="mt-2 px-3 py-2 rounded-xl
          bg-white/10 border border-white/15
          flex justify-between items-center"
        >
          <div>
            <p className="text-sm font-medium text-white">
              {selectedToken.name}
            </p>
            <p className="text-xs text-white/50">
              {selectedToken.symbol}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-white">
              {selectedToken.balance}
            </p>
            <p className="text-xs text-white/50">
              Available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
