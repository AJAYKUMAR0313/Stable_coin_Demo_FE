import { useState } from "react";
import { useTransferStore } from "../transferStore";

export default function AddPayee({ customerId, onSuccess, onCancel }) {
  const { addPayee } = useTransferStore();

  const [form, setForm] = useState({
    customer_id: customerId,
    payee_name: "",
    nickname: "",
    phone_number: "",
    bank_account_number: "",
    wallet_address: "",
    is_favorite: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!form.payee_name.trim() || !form.wallet_address.trim()) {
      setError("Payee name and wallet address are required");
      return;
    }

    setLoading(true);

    try {
      await addPayee(customerId, {
        ...form,
        is_active: true,
      });

      onSuccess?.(); // close modal + refresh list
    } catch (e) {
      setError(
        e?.message || "Failed to add payee. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white/10 backdrop-blur-xl
        border border-white/15
        rounded-2xl p-5
        max-w-md w-full
        flex flex-col gap-4
      "
    >
      {/* HEADER */}
      <h2 className="text-lg font-semibold text-white text-center">
        Add Payee
      </h2>

      {/* PAYEE NAME */}
      <input
        placeholder="Payee name *"
        value={form.payee_name}
        onChange={(e) =>
          handleChange("payee_name", e.target.value)
        }
        className="glass-input"
      />

      {/* NICKNAME */}
      <input
        placeholder="Nickname (optional)"
        value={form.nickname}
        onChange={(e) =>
          handleChange("nickname", e.target.value)
        }
        className="glass-input"
      />

      {/* PHONE */}
      <input
        placeholder="Phone number"
        value={form.phone_number}
        onChange={(e) =>
          handleChange("phone_number", e.target.value)
        }
        className="glass-input"
      />

      {/* BANK ACCOUNT */}
      <input
        placeholder="Bank account number"
        value={form.bank_account_number}
        onChange={(e) =>
          handleChange("bank_account_number", e.target.value)
        }
        className="glass-input"
      />

      {/* WALLET */}
      <input
        placeholder="Wallet address *"
        value={form.wallet_address}
        onChange={(e) =>
          handleChange("wallet_address", e.target.value)
        }
        className="glass-input font-mono"
      />

      {/* FAVORITE */}
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input
          type="checkbox"
          checked={form.is_favorite}
          onChange={(e) =>
            handleChange("is_favorite", e.target.checked)
          }
        />
        Mark as favorite
      </label>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-400">
          ⚠ {error}
        </p>
      )}

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="
            flex-1 py-2 rounded-xl
            bg-white/10 border border-white/15
            text-sm text-white/80
            hover:bg-white/20 transition
          "
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`
            flex-1 py-2 rounded-xl font-semibold transition
            ${
              loading
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:scale-[1.02]"
            }
          `}
        >
          {loading ? "Saving..." : "Save Payee"}
        </button>
      </div>
    </div>
  );
}
