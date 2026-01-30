import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransactionDetailsModal from "../features/transactions/TransactionDetailsModal.jsx";
import { statusStyle, formatDate }  from "../features/transactions/commonFunctions.js";

export default function Dashboard() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState({
    eth: 0,
    usdc: 0,
    wei: 0,
  });

  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const getBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/wallet/balance/${localStorage.getItem(
          "wallet_address",
        )}`,
      );

      setBalance({
        eth: response.data.balance_eth,
        usdc: response.data.balance_usdc,
        wei: response.data.balance_wei,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/transactions/transactions/${localStorage.getItem("wallet_address")}`,
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
    fetchTransactions();
  }, []);


  // const statusStyle = (status) => {
  //   switch (status) {
  //     case "SUCCESS":
  //       return "bg-green-100 text-green-700";
  //     case "PENDING":
  //       return "bg-yellow-100 text-yellow-700";
  //     case "FAILED":
  //       return "bg-red-100 text-red-700";
  //     default:
  //       return "bg-gray-100 text-gray-700";
  //   }
  // };

  // const transactions = [
  //   { id: 1, type: "Credit", amount: "+200", date: "2026-01-20" },
  //   { id: 2, type: "Debit", amount: "-50", date: "2026-01-19" },
  //   { id: 3, type: "Credit", amount: "+500", date: "2026-01-18" },
  //   { id: 4, type: "Debit", amount: "-120", date: "2026-01-17" },
  //   { id: 5, type: "Credit", amount: "+300", date: "2026-01-16" },
  // ];

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="sticky top-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <p className="text-xs opacity-80">ETH</p>
            <p className="font-semibold">{balance.eth}</p>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <p className="text-xs opacity-80">USDC</p>
            <p className="font-semibold">${balance.usdc}</p>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <p className="text-xs opacity-80">Wei</p>
            <p className="font-semibold truncate">
              {balance.wei.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/dashboard/buy")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            Get Tokens
          </button>

          <button
            onClick={() => navigate("/dashboard/transfer")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            Transfer
          </button>

          <button
            onClick={() => navigate("/dashboard/transactions")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            History
          </button>
          <button
            onClick={() => navigate("/dashboard/offramp")}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            Get Fiat
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Asset</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Tx Hash</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.tx_hash}
                    onClick={() => setSelectedTx(tx)}
                    className="border-b last:border-none cursor-pointer hover:bg-gray-50"
                  >
                    <td className="py-3">{formatDate(tx.timestamp)}</td>

                    <td
                      className={`py-3 font-medium ${
                        tx.transaction_type === "RECEIVED"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.transaction_type}
                    </td>

                    <td className="py-3 font-semibold">
                      {tx.amount}{" "}
                      {tx.asset?.startsWith("Token:") ? "USDC" : tx.asset}
                    </td>

                    <td className="py-3">
                      {tx.asset?.startsWith("Token:") ? "USDC" : tx.asset}
                    </td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                          tx.status,
                        )}`}
                      >
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3 text-xs text-blue-600 truncate max-w-[140px]">
                      {tx.tx_hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedTx && (
        <TransactionDetailsModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
}
