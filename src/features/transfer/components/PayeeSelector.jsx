import { useState } from "react";
import { useTransferStore } from "../transferStore";

export default function PayeeSelector() {
  const [search, setSearch] = useState("");

  const {
    recipient,
    setRecipient,
  } = useTransferStore();

  // TEMP MOCK DATA
  const payees = [
    {
      id: 1,
      name: "Ajay Kumar",
      wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    },
    {
      id: 2,
      name: "Swarnaraj",
      wallet: "0xA16b5E6a4e4bD5E0E1f3A9c9F34b56a7d8E12345",
    },
  ];

  const filteredPayees = payees.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-white/80">
        Select Payee
      </label>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search saved payees"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15
                   text-sm text-white placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
      />

      {/* PAYEE LIST */}
      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto no-scrollbar">
        {filteredPayees.length === 0 && (
          <p className="text-xs text-white/40 text-center py-3">
            No payees found
          </p>
        )}

        {filteredPayees.map((payee) => (
          <button
            key={payee.id}
            onClick={() => setRecipient(payee.wallet)}   // 🔥 IMPORTANT
            className={`w-full p-3 rounded-xl text-left transition border
              ${
                recipient === payee.wallet
                  ? "bg-cyan-400/20 border-cyan-400"
                  : "bg-white/10 border-white/15 hover:bg-white/20"
              }`}
          >
            <p className="text-sm font-medium text-white">
              {payee.name}
            </p>
            <p className="text-xs text-white/50 font-mono truncate">
              {payee.wallet}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
