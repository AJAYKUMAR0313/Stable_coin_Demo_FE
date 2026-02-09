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

  /* Pagination */
  const [page, setPage] = useState(1);
  const limit = 5;

  /* Wallet balances */
  const [fiatBalance, setFiatBalance] = useState(0);
  const [totalStableValue, setTotalStableValue] = useState(0);

  const [stablecoins, setStablecoins] = useState([
    { name: "USDC", balance: 0, change: "", icon: "🔵" },
    { name: "USDT", balance: 0, change: "", icon: "🟢" },
    { name: "JPM", balance: 0, change: "", icon: "🔷" },
  ]);

  /* Prevent scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = selectedTx ? "hidden" : "auto";
  }, [selectedTx]);

  const articles = [
    {
      id: 1,
      title: "Understanding Stablecoins",
      excerpt: "Pegged crypto for price stability.",
      category: "Education",
      image: "📚",
    },
    {
      id: 2,
      title: "USDC vs USDT",
      excerpt: "Transparency & liquidity compared.",
      category: "Comparison",
      image: "⚖️",
    },
  ];

  /* ================= TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const wallet = localStorage.getItem("wallet_address");
      const offset = (page - 1) * limit;

      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

      const response = await axios.get(
        `${apiUrl}transactions/transactions/${wallet}`,
        { params: { limit, offset } }
      );

      setTransactions(response?.data || []);
    } catch (error) {
      console.error("Transaction fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= WALLET BALANCE ================= */
  const fetchWalletBalance = async () => {
    try {
      const wallet = localStorage.getItem("wallet_address");
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";
      const res = await axios.get(
        `${apiUrl}wallet/balance/${wallet}`
      );

      const data = res.data;

      setFiatBalance(data.totalFiat || 0);
      setTotalStableValue(data.totalStablecoinValue || 0);

      /* Map backend stablecoins to UI */
      setStablecoins((prev) =>
        prev.map((coin) => {
          const backendCoin = data.stablecoins?.find(
            (c) => c.symbol === coin.name
          );

          return {
            ...coin,
            balance: backendCoin
              ? Number(backendCoin.balance).toFixed(2)
              : 0,
          };
        })
      );
    } catch (err) {
      console.error("Wallet balance error:", err);
    }
  };

  /* Transactions pagination */
  useEffect(() => {
    fetchTransactions();
  }, [page]);

  /* Wallet balance once */
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4] text-sm">
      <div
        className={`max-w-[1400px] mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 transition-all duration-300 ${
          selectedTx ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* MAIN */}
        <main className="lg:col-span-3 flex flex-col gap-6">

          {/* BALANCES */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Fiat Balance", value: `₹${fiatBalance}`, icon: "💵" },
              {
                label: "Stablecoins",
                value: `$${totalStableValue}`,
                icon: "🪙",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5 shadow-md"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">
                    {item.label}
                  </span>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="text-2xl font-semibold">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* HOLDINGS */}
          <section className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5">
            <h2 className="text-base font-semibold mb-4">
              Stablecoin Holdings
            </h2>

            <div className="grid md:grid-cols-3 gap-3">
              {stablecoins.map((coin) => (
                <div
                  key={coin.name}
                  className="bg-white/10 border border-white/15 rounded-lg p-4 hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{coin.icon}</span>
                    <p className="font-medium text-sm">{coin.name}</p>
                  </div>
                  <p className="text-lg font-semibold">
                    ${coin.balance}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK SERVICES */}
          <section className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5">
            <h2 className="text-base font-semibold mb-4">
              Quick Services
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: "💰", label: "Buy", path: "/dashboard/stablecoin/buy-stable" },
                { icon: "💱", label: "Transfer", path: "/dashboard/transfer" },
                { icon: "💵", label: "Convert", path: "/dashboard/stablecoin/convert" },
                { icon: "📊", label: "Analytics", path: "/dashboard/stablecoin/analytics" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="p-4 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 transition"
                  onClick={() => navigate(item.path)}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs font-medium">{item.label}</p>
                </button>
              ))}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5">
            <h2 className="text-base font-semibold mb-4">
              Recent Transactions
            </h2>

            {loading ? (
              <p className="text-white/70 text-xs">
                Loading transactions...
              </p>
            ) : transactions?.length === 0 ? (
              <p className="text-white/70 text-xs">
                No transactions found
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.tx_hash}
                    onClick={() => setSelectedTx(tx)}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 cursor-pointer transition"
                  >
                    <div>
                      <p
                        className={`font-medium text-xs ${
                          tx.transaction_type === "RECEIVED"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.transaction_type} {tx.asset}
                      </p>
                      <p className="text-[10px] text-white/60">
                        {tx.timestamp}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-cyan-300 text-xs">
                        {tx.amount} {tx.asset}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${statusStyle(
                          tx.status
                        )}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}

                {/* PAGINATION */}
                <div className="flex justify-between mt-3">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs disabled:opacity-40"
                  >
                    ← Prev
                  </button>

                  <span className="text-xs text-white/70">
                    Page {page}
                  </span>

                  <button
                    disabled={transactions.length < limit}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-3">
          <h3 className="text-base font-semibold">Insights</h3>

          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-lg hover:bg-white/20 transition"
            >
              <div className="p-4 text-2xl text-center border-b border-white/10">
                {article.image}
              </div>
              <div className="p-3">
                <span className="text-[10px] text-cyan-300 font-semibold">
                  {article.category}
                </span>
                <p className="text-xs font-medium mt-1">
                  {article.title}
                </p>
                <p className="text-[10px] text-white/60 mt-1">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>

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
