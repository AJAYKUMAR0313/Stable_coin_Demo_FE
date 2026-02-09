import { useState } from "react";
import { useTransferStore } from "../transferStore";
import RecipientInput from "./RecipientInput";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import BalanceDisplay from "./BalanceDisplay";
import TransferModeSelector from "./TransferModeSelector";
import PayeeSelector from "./PayeeSelector";
import UserSearchInput from "./UserSearchInput";
import Modal from "./Modal";
import AddPayee from "./AddPayee";
// import { useTransferStore } from "../transferStore"; // Import payees and refresh function

export default function TransferForm({ onContinue }) {
  const {
    recipient,
    setRecipient,
    selectedToken,
    amount,
    note,
    setNote,
    transferMode,
    isCheckingRecipient,
    payees,
    loadPayees
  } = useTransferStore();

  const [recipientError, setRecipientError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const [showNote, setShowNote] = useState(false);
  const [showAddPayee, setShowAddPayee] = useState(false);

  const user = {
    customer_id: localStorage.getItem("customerId"), // Replace with actual user data
  }

  const isFormValid = () => {
    if (!recipient) return false;
    if (recipientError) return false;
    if (isCheckingRecipient) return false;

    if (!selectedToken) return false;
    if (!amount || Number(amount) <= 0) return false;
    if (amountError) return false;

    return true;
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-xl
      border border-white/15
      rounded-2xl max-w-lg w-full mx-auto
      h-full flex flex-col"
    >
      {/* FORM CONTENT */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* RECIPIENT */}
          <div className="md:col-span-2">
            <TransferModeSelector />
          </div>

          <div className="md:col-span-2">
            {transferMode === "WALLET" && (
              <RecipientInput
                value={recipient}
                onChange={setRecipient}
                error={recipientError}
                setError={setRecipientError}
              />
            )}

            {transferMode === "PAYEE" && (
              <>
                <PayeeSelector payees={payees}/>
                <button
                  onClick={() => setShowAddPayee(true)}
                  className="text-xs text-cyan-300 hover:underline text-left"
                >
                  + Add new payee
                </button>
              </>
            )}

            {transferMode === "SEARCH" && <UserSearchInput />}
          </div>

          {/* TOKEN */}
          <TokenSelector />

          {/* AMOUNT */}
          <AmountInput error={amountError} setError={setAmountError} />

          {/* BALANCE */}
          <div className="md:col-span-2">
            <BalanceDisplay />
          </div>

          {/* NOTE TOGGLE */}
          <div className="md:col-span-2">
            <button
              onClick={() => setShowNote(!showNote)}
              className="text-xs text-cyan-300 hover:text-cyan-200 transition"
            >
              {showNote ? "− Remove note" : "+ Add a note"}
            </button>
          </div>

          {/* NOTE */}
          {showNote && (
            <div className="md:col-span-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (optional)"
                maxLength={200}
                className="w-full min-h-[60px] px-3 py-2 rounded-xl
                bg-white/10 border border-white/15
                text-sm text-white placeholder-white/50
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                resize-none transition"
              />
            </div>
          )}
        </div>
      </div>

      {/* CTA — PART OF THE SAME FORM */}
      {isFormValid && (
        <div className="px-4 pb-4 animate-slide-up">
          <button
            onClick={onContinue}
            className="
        w-full py-3 rounded-xl font-semibold
        bg-gradient-to-r from-cyan-400 to-blue-600
        text-black
        hover:scale-[1.02]
        transition
      "
          >
            Continue
          </button>
        </div>
      )}

      <Modal open={showAddPayee} onClose={() => setShowAddPayee(false)}>
        <AddPayee
          customerId={user.customer_id}
          onSuccess={() => {
            loadPayees(user.customer_id); // reload saved payees
            setShowAddPayee(false);
          }}
          onCancel={() => setShowAddPayee(false)}
        />
      </Modal>
    </div>
  );
}
