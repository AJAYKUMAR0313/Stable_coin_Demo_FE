import { useState, useEffect } from "react";
import { useTransferStore } from "../transferStore";
import ConfirmDialog from "./ConfirmDialog";

export default function PayeeSelector() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [payeeToDelete, setPayeeToDelete] = useState(null);

  const {
    recipient,
    setRecipient,
    loadPayees,
    deletePayee,
    payees,
  } = useTransferStore();

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    loadPayees(customerId);
  }, [customerId, loadPayees]);

  const filteredPayees = payees.filter((p) =>
    p.payee_name.toLowerCase().includes(search.toLowerCase())
  );

  const visiblePayees = expanded
    ? filteredPayees
    : filteredPayees.slice(0, 4);

  /* ---------------- DELETE HANDLER ---------------- */
  const handleConfirmDelete = async () => {
    console.log("Deleting payee", payeeToDelete);
    if (!payeeToDelete) return;

    await deletePayee(customerId, payeeToDelete.id);

    // Clear recipient if deleted payee was selected
    if (recipient === payeeToDelete.wallet_address) {
      setRecipient("");
    }

    // Refresh list
    await loadPayees(customerId);

    setPayeeToDelete(null);
  };

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
            <div
              key={payee.id}
              className={`
                flex items-center justify-between
                p-3 rounded-xl border transition
                ${
                  isSelected
                    ? "bg-cyan-400/20 border-cyan-400"
                    : "bg-white/10 border-white/15 hover:bg-white/20"
                }
              `}
            >
              {/* SELECT PAYEE */}
              <button
                onClick={() => setRecipient(payee.wallet_address)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-white">
                  {payee.payee_name}
                </p>
                <p className="text-xs text-white/50 font-mono truncate max-w-[220px]">
                  {payee.wallet_address}
                </p>
              </button>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 ml-3">
                {isSelected && (
                  <span className="text-cyan-400 text-sm font-semibold">
                    ✓
                  </span>
                )}

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPayeeToDelete(payee);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                  title="Delete payee"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW ALL */}
      {!expanded && filteredPayees.length > 4 && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-cyan-300 hover:text-cyan-200 self-start"
        >
          View all payees →
        </button>
      )}

      {/* SELECTED PAYEE SUMMARY */}
      {recipient && (
        <div className="mt-2 p-3 rounded-xl bg-white/10 border border-white/15">
          <p className="text-xs text-white/50 mb-1">
            Selected Payee
          </p>
          <p className="text-sm text-white font-medium">
            {payees.find((p) => p.wallet_address === recipient)?.payee_name}
          </p>
          <p className="text-xs text-white/50 font-mono break-all">
            {recipient}
          </p>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        open={!!payeeToDelete}
        title="Delete Payee"
        description={`Are you sure you want to delete "${payeeToDelete?.payee_name}"? This action cannot be undone.`}
        confirmText="Delete"
        onCancel={() => setPayeeToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
