import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { statusStyle } from "../transactions/commonFunctions.js";

/* Lazy load modal */
const TransactionDetailsModal = lazy(() =>
  import("./TransactionDetailsModal")
);

/* ================= Skeleton Components ================= */

const BalanceSkeleton = () => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5 animate-pulse">
    <div className="h-3 w-20 bg-white/20 rounded mb-3"></div>
    <div className="h-6 w-32 bg-white/20 rounded"></div>
  </div>
);

const CoinSkeleton = () => (
  <div className="bg-white/10 border border-white/15 rounded-lg p-4 animate-pulse">
    <div className="h-5 w-16 bg-white/20 mb-3 rounded"></div>
    <div className="h-6 w-20 bg-white/20 rounded"></div>
  </div>
);

const ServiceSkeleton = () => (
  <div className="p-4 rounded-lg bg-white/10 border border-white/15 animate-pulse">
    <div className="h-6 w-6 bg-white/20 mx-auto mb-2 rounded"></div>
    <div className="h-3 w-12 bg-white/20 mx-auto rounded"></div>
  </div>
);

const CardSkeleton = () => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-4 animate-pulse h-40">
    <div className="h-4 w-24 bg-white/20 rounded mb-3"></div>
    <div className="h-3 w-full bg-white/20 rounded mb-2"></div>
    <div className="h-3 w-3/4 bg-white/20 rounded"></div>
  </div>
);

/* ================= Main Component ================= */

const StablecoinDashboard = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);

  const [loadingTx, setLoadingTx] = useState(true);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [fiatBalance, setFiatBalance] = useState(0);
  const [totalStableValue, setTotalStableValue] = useState(0);

  const [stablecoins, setStablecoins] = useState([
    { name: "USDC", balance: 0, icon: "🔵" },
    { name: "USDT", balance: 0, icon: "🟢" },
    { name: "JPM", balance: 0, icon: "🔷" },
  ]);

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

  /* Prevent scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = selectedTx ? "hidden" : "auto";
  }, [selectedTx]);

  /* ================= API CALLS ================= */

  const fetchTransactions = async () => {
    try {
      setLoadingTx(true);

      const wallet = localStorage.getItem("wallet_address");
      const offset = (page - 1) * limit;
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

      const response = await axios.get(
        `${apiUrl}transactions/transactions/${wallet}`,
        { params: { limit, offset } }
      );

      setTransactions(response?.data || []);
    } catch (error) {
      console.error("Transaction fetch error:", error);
    } finally {
      setLoadingTx(false);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      setLoadingWallet(true);

      const wallet = localStorage.getItem("wallet_address");
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

      const res = await axios.get(`${apiUrl}wallet/balance`, {
        params: { wallet_address: wallet },
      });

      const data = res.data;

      setFiatBalance(data.totalFiat || 0);
      setTotalStableValue(data.totalStablecoinValue || 0);

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
    } finally {
      setLoadingWallet(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  useEffect(() => {
    fetchWalletBalance();
    setTimeout(() => setLoadingArticles(false), 500);
  }, []);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4] text-sm">

      <div className="max-w-[1400px] mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* MAIN */}
        <main className="lg:col-span-3 flex flex-col gap-6">

          {/* BALANCES */}
          <div className="grid md:grid-cols-2 gap-4">
            {loadingWallet
              ? [1, 2].map((i) => <BalanceSkeleton key={i} />)
              : [
                  { label: "Fiat Balance", value: `₹${fiatBalance}`, icon: "💵" },
                  { label: "Stablecoins", value: `$${totalStableValue}`, icon: "🪙" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5"
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
              {loadingWallet
                ? [1, 2, 3].map((i) => <CoinSkeleton key={i} />)
                : stablecoins.map((coin) => (
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
              {loadingWallet
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ServiceSkeleton key={i} />
                  ))
                : [
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

          {/* TRANSACTIONS (ORIGINAL DESIGN + SKELETON) */}
          <section className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-5">
            <h2 className="text-base font-semibold mb-4">
              Recent Transactions
            </h2>

            {loadingTx ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/10 border border-white/15 animate-pulse"
                  >
                    <div>
                      <div className="h-3 w-24 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 w-32 bg-white/20 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-3 w-16 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 w-10 bg-white/20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* SIDEBAR INSIGHTS */}
        <aside className="hidden lg:flex flex-col gap-3">
          <h3 className="text-base font-semibold">Insights</h3>

          {loadingArticles
            ? [1, 2].map((i) => <CardSkeleton key={i} />)
            : articles.map((article) => (
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

      {/* Lazy Modal */}
      {selectedTx && (
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <TransactionDetailsModal
            tx={selectedTx}
            onClose={() => setSelectedTx(null)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default StablecoinDashboard;
