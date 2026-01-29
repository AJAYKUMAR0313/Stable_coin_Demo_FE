import { useEffect, useState } from "react";
// import axios from "axios";
import { mockTransactions } from "./mockTransactions";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useNavigate } from "react-router-dom";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);
  const navigate = useNavigate();

  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/transactions/${localStorage.getItem("wallet_address")}`
  //       );
  //       setTransactions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching transactions", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchTransactions();
  //   }, []);
  useEffect(() => {
    setTransactions(mockTransactions);
    setLoading(false);
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp * 1000).toLocaleString();
  };

  const statusStyle = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
        Transaction History
      </h2>
      <button
        onClick={() => navigate("/dashboard")}      
        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Back to Dashboard
      </button>
      </div>

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
                      tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </td>

                  <td className="py-3 font-semibold">
                    {tx.value_eth} {tx.asset}
                  </td>

                  <td className="py-3">{tx.asset}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        tx.transaction_status,
                      )}`}
                    >
                      {tx.transaction_status}
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

      {selectedTx && (
        <TransactionDetailsModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
}
