import { useState, useRef } from "react";
import axios from "axios";
import { useTransferStore } from "../transferStore";

export default function UserSearchInput() {
  const { recipient, setRecipient } = useTransferStore();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  const searchUsers = async (q) => {
    if (!q || q.length < 2) {
      setUsers([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        "http://localhost:8000/wallet/search-users",
        {
          params: { query: q,tenant_id: localStorage.getItem("tenantId") ,current_customer_id: localStorage.getItem("customerId") },
        }
      );

      setUsers(res.data || []);
    } catch (err) {
      // console.error(err,err.response);

      // Handle FastAPI error format
      const apiError =
        err?.response?.data?.detail?.[0]?.msg || err?.response?.data?.detail ||
        "Failed to search users";

      setError(apiError);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchUsers(value);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* LABEL */}
      <label className="text-sm text-white/80">
        Search User (Name / Phone)
      </label>

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by name or phone number"
        className="
          w-full px-3 py-2 rounded-xl
          bg-white/10 backdrop-blur-md
          border border-white/15
          text-sm text-white placeholder-white/40
          focus:outline-none focus:ring-2 focus:ring-cyan-400/40
        "
      />

      {/* STATES */}
      {loading && (
        <p className="text-xs text-white/60">Searching users…</p>
      )}

      {error && (
        <p className="text-xs text-red-400">⚠ {error}</p>
      )}

      {/* RESULTS */}
      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto no-scrollbar">
        {!loading && query && users.length === 0 && !error && (
          <p className="text-xs text-white/40 text-center py-3">
            No users found
          </p>
        )}

        {users.map((user) => (
          <button
            key={user.customer_id}
            onClick={() => setRecipient(user.wallet_address)}
            className={`w-full p-3 rounded-xl text-left transition border
              ${
                recipient === user.wallet_address
                  ? "bg-cyan-400/20 border-cyan-400"
                  : "bg-white/10 border-white/15 hover:bg-white/20"
              }
            `}
          >
            <p className="text-sm font-medium text-white">
              {user.name}
            </p>
            <p className="text-xs text-white/60">
              📞 {user.phone_number}
            </p>
            <p className="text-xs text-white/40 font-mono truncate">
              {user.wallet_address}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
