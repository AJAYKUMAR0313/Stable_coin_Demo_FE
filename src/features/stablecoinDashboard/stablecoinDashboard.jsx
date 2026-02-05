import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { statusStyle } from "../transactions/commonFunctions.js";

const StablecoinDashboard = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Prevent scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = selectedTx ? "hidden" : "auto";
  }, [selectedTx]);

  const stablecoins = [
    { name: "USDC", balance: 1352, change: "+2.5%", icon: "🔵" },
    { name: "USDT", balance: 123, change: "+1.2%", icon: "🟢" },
    { name: "JPM", balance: 11, change: "+0.8%", icon: "🔷" },
  ];

  const articles = [
    {
      id: 1,
      title: "Understanding Stablecoins: A Beginner's Guide",
      excerpt: "Stablecoins maintain value by pegging to fiat currencies.",
      date: "Feb 5, 2026",
      readTime: "5 min read",
      category: "Education",
      image: "📚",
    },
    {
      id: 2,
      title: "USDC vs USDT",
      excerpt: "Backing, transparency, and use cases compared.",
      date: "Feb 4, 2026",
      readTime: "7 min read",
      category: "Comparison",
      image: "⚖️",
    },
  ];

  /* Fetch transactions */
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/transactions/transactions/${localStorage.getItem(
          "wallet_address"
        )}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]">
      
      {/* Blur background when modal open */}
      <div
        className={`max-w-[1600px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 transition-all duration-300 ${
          selectedTx ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* MAIN */}
        <main className="lg:col-span-3 flex flex-col gap-8">
          
          {/* BALANCE */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Fiat Balance", value: "₹32,451", icon: "💵" },
              { label: "Total Stablecoins", value: "$1,486", icon: "🪙" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-7 shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-white/70">
                    {item.label}
                  </span>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="text-4xl font-bold">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* HOLDINGS */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Stablecoin Holdings
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {stablecoins.map((coin) => (
                <div
                  key={coin.name}
                  className="bg-white/10 border border-white/15 rounded-xl p-5 hover:bg-white/20 hover:-translate-y-1 transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{coin.icon}</span>
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-xs text-green-400">
                        {coin.change}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    ${coin.balance}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK SERVICES */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Quick Services
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "💰", label: "Buy", path: "/dashboard/stablecoin/buy-stable" },
                { icon: "💱", label: "Transfer", path: "/dashboard/stablecoin/transfer" },
                { icon: "💵", label: "Convert", path: "/dashboard/stablecoin/convert" },
                { icon: "📊", label: "Analytics", path: "/dashboard/stablecoin/analytics" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="p-5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition"
                  onClick={() => navigate(item.path)}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-sm">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Recent Transactions
            </h2>

            {loading ? (
              <p className="text-white/70 text-sm">
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p className="text-white/70 text-sm">
                No transactions found
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.tx_hash}
                    onClick={() => setSelectedTx(tx)}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 cursor-pointer transition"
                  >
                    <div>
                      <p className={`font-medium ${
                        tx.transaction_type === "RECEIVED"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                        {tx.transaction_type} {tx.asset}
                      </p>
                      <p className="text-xs text-white/60">
                        {tx.timestamp}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-cyan-300">
                        {tx.amount} {tx.asset}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs ${statusStyle(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">
            Insights
          </h3>

          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl hover:bg-white/20 transition"
            >
              <div className="p-6 text-4xl text-center border-b border-white/10">
                {article.image}
              </div>
              <div className="p-4">
                <span className="text-xs text-cyan-300 font-semibold">
                  {article.category}
                </span>
                <p className="text-sm font-semibold mt-2">
                  {article.title}
                </p>
                <p className="text-xs text-white/60 mt-2">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Modal rendered outside blurred area */}
      {selectedTx && (
        <TransactionDetailsModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
};

export default StablecoinDashboard;
