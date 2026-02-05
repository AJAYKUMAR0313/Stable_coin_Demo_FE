import React from "react";

export default function TransferRefactor() {
  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4] text-white">

      {/* MOBILE CARD */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl
        border border-white/15 rounded-3xl shadow-2xl p-5">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition">
            ←
          </button>
          <h2 className="font-semibold text-lg">Transfer Tokens</h2>
        </div>

        {/* SEARCH */}
        <div className="relative mb-4">
          <input
            placeholder="Search name or wallet address"
            className="w-full px-4 py-2.5 rounded-xl
            bg-white/10 border border-white/15
            placeholder-white/50 text-sm
            focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* RECENT CONTACTS */}
        <div className="space-y-3 mb-5">
          {["Stable Gan", "Bid teink", "Hulce katliet", "Mable trmhaus"].map(
            (name, i) => (
              <div
                key={i}
                className="flex items-center justify-between
                bg-white/10 border border-white/15
                rounded-xl p-3 hover:bg-white/20 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/20
                    flex items-center justify-center font-semibold">
                    💼
                  </div>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-white/60">
                      @wallet_…{i + 1}pm
                    </p>
                  </div>
                </div>
                <span className="text-cyan-300">⇄</span>
              </div>
            )
          )}
        </div>

        {/* TOKEN SELECT */}
        <div className="bg-white/10 border border-white/15 rounded-xl p-3 mb-4">
          <p className="text-xs text-white/60 mb-2">Token</p>
          <div className="flex gap-2">
            {["USDC", "USDT", "JPM"].map((token) => (
              <button
                key={token}
                className="px-3 py-1.5 rounded-lg text-sm
                bg-white/10 hover:bg-white/20 transition"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mb-4">
          <label className="text-xs text-white/60">Transfer Amount</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full mt-1 px-4 py-2.5 rounded-xl
            bg-white/10 border border-white/15
            text-lg font-semibold
            focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* WALLET */}
        <div className="mb-5">
          <label className="text-xs text-white/60">
            Recipient Wallet Address
          </label>
          <input
            placeholder="0x…"
            className="w-full mt-1 px-4 py-2.5 rounded-xl
            bg-white/10 border border-white/15
            text-sm
            focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* TRANSFER BUTTON */}
        <button
          className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-cyan-400 to-blue-600
          text-black hover:scale-[1.02] transition mb-3"
        >
          Transfer
        </button>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 rounded-xl bg-white/10 border border-white/15
            hover:bg-white/20 transition text-sm">
            📷 Scan QR
          </button>
          <button className="py-2 rounded-xl bg-white/10 border border-white/15
            hover:bg-white/20 transition text-sm">
            📋 Paste Address
          </button>
        </div>

        <button className="mt-3 w-full text-xs text-cyan-300 hover:underline">
          + Add to Saved Contacts
        </button>
      </div>
    </div>
  );
}
