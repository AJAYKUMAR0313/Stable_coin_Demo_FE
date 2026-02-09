import { useState, useEffect } from "react";
import { useTransferStore } from "../transferStore";

export default function PayeeSelector() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const {
    recipient,
    setRecipient,
    loadPayees,
    payees,
  } = useTransferStore();

  useEffect(() => {
    loadPayees(localStorage.getItem("customerId"));
  }, []);

  const filteredPayees = payees.filter((p) =>
    p.payee_name.toLowerCase().includes(search.toLowerCase())
  );

  const visiblePayees = expanded
    ? filteredPayees
    : filteredPayees.slice(0, 4);

  return (
    <div className="flex flex-col gap-3">
      {/* LABEL */}
      <label className="text-sm text-white/80">
        Pay to Saved Payee
      </label>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search payee name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setExpanded(true);
        }}
        className="
          w-full px-3 py-2 rounded-xl
          bg-white/10 backdrop-blur-md
          border border-white/15
          text-sm text-white placeholder-white/40
          focus:outline-none focus:ring-2 focus:ring-cyan-400/40
        "
      />

      {/* PAYEE LIST */}
      <div className="flex flex-col gap-2">
        {visiblePayees.length === 0 && (
          <p className="text-xs text-white/40 text-center py-2">
            No payees found
          </p>
        )}

        {visiblePayees.map((payee) => {
          const isSelected = recipient === payee.wallet_address;

          return (
            <button
              key={payee.id}
              onClick={() => setRecipient(payee.wallet_address)}
              className={`
                w-full flex items-center justify-between
                p-3 rounded-xl transition
                border
                ${
                  isSelected
                    ? "bg-cyan-400/20 border-cyan-400"
                    : "bg-white/10 border-white/15 hover:bg-white/20"
                }
              `}
            >
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-white">
                  {payee.payee_name}
                </span>
                <span className="text-xs text-white/50 font-mono truncate max-w-[220px]">
                  {payee.wallet_address}
                </span>
              </div>

              {isSelected && (
                <span className="text-cyan-400 text-sm font-semibold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* VIEW ALL TOGGLE */}
      {!expanded && filteredPayees.length > 4 && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-cyan-300 hover:text-cyan-200 self-start"
        >
          View all payees →
        </button>
      )}

      {/* SELECTED PAYEE CHIP */}
      {recipient && (
        <div className="mt-2 p-3 rounded-xl bg-white/10 border border-white/15">
          <p className="text-xs text-white/50 mb-1">
            Selected Payee
          </p>
          <p className="text-sm text-white font-medium">
            {payees.find(p => p.wallet_address === recipient)?.payee_name}
          </p>
          <p className="text-xs text-white/50 font-mono break-all">
            {recipient}
          </p>
        </div>
      )}
    </div>
  );
}
