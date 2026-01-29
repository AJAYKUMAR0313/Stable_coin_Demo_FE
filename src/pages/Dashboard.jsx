import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState({
    eth: 0,
    usdc: 0,
    wei: 0,
  });

  const getBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/wallet/balance/${localStorage.getItem(
          "wallet_address"
        )}`
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

  useEffect(() => {
    getBalance();
  }, []);

  const transactions = [
    { id: 1, type: "Credit", amount: "+200", date: "2026-01-20" },
    { id: 2, type: "Debit", amount: "-50", date: "2026-01-19" },
    { id: 3, type: "Credit", amount: "+500", date: "2026-01-18" },
    { id: 4, type: "Debit", amount: "-120", date: "2026-01-17" },
    { id: 5, type: "Credit", amount: "+300", date: "2026-01-16" },
  ];

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

          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
            History
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No recent transactions</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-none">
                  <td className="py-3">{tx.date}</td>
                  <td
                    className={`py-3 font-medium ${
                      tx.type === "Credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="py-3">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
