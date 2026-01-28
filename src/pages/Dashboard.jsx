import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // mock data (replace with backend later)
  const user = {
    name: localStorage.getItem("username"),
    email: "user@example.com",
  };

  const balance = 1250.75;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("wallet_address");
    navigate("/login");
  };

  const transactions = [
    { id: 1, type: "Credit", amount: "+200", date: "2026-01-20" },
    { id: 2, type: "Debit", amount: "-50", date: "2026-01-19" },
    { id: 3, type: "Credit", amount: "+500", date: "2026-01-18" },
    { id: 4, type: "Debit", amount: "-120", date: "2026-01-17" },
    { id: 5, type: "Credit", amount: "+300", date: "2026-01-16" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-700">{user.email}</p>
          </div>
          <div className="bg-blue-500 px-4 py-2 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-white">
              <button onClick={() => logout()}>logout</button>
            </p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 mb-6">
        <p className="text-sm opacity-90">Current Balance</p>
        <h2 className="text-3xl font-bold mt-2">
          ₹ {balance.toLocaleString()}
        </h2>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-6">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
            Get Tokens
          </button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100">
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
                      tx.type === "Credit" ? "text-green-600" : "text-red-600"
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
