import React from "react";
import { useNavigate } from "react-router-dom";

const StablecoinDashboard = () => {

  const navigate = useNavigate();

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

  const recentTransactions = [
    { id: 1, type: "Buy", coin: "USDC", amount: 500, date: "Today, 10:30 AM" },
    { id: 2, type: "Transfer", coin: "USDT", amount: 50, date: "Yesterday, 3:45 PM" },
    { id: 3, type: "Convert", coin: "JPM", amount: 5, date: "Feb 3, 11:20 AM" },
  ];


  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]">

      <div className="max-w-[1600px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* MAIN */}
        <main className="lg:col-span-3 flex flex-col gap-8">

          {/* TOP BALANCE CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Fiat Balance", value: "₹32,451", icon: "💵" },
              { label: "Total Stablecoins", value: "$1,486", icon: "🪙" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/15
                rounded-2xl p-7 shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-white/70">{item.label}</span>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="text-4xl font-bold tracking-tight">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* HOLDINGS */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">Stablecoin Holdings</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {stablecoins.map((coin) => (
                <div
                  key={coin.name}
                  className="bg-white/10 border border-white/15 rounded-xl p-5
                  hover:bg-white/20 hover:-translate-y-1 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{coin.icon}</span>
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-xs text-green-400">{coin.change}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">${coin.balance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK SERVICES */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">Quick Services</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "💰", label: "Buy" },
                { icon: "💱", label: "Transfer" },
                { icon: "💵", label: "Convert" },
                { icon: "📊", label: "Analytics" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="p-5 rounded-xl bg-white/10 border border-white/15
                  hover:bg-white/20 hover:-translate-y-1 transition text-center"
                  onClick={() => item.label === "Buy" && navigate("/dashboard/stablecoin/buy-stable")}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-sm">{item.label}</p>
                </button>
              ))}
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">Recent Transactions</h2>

            <div className="flex flex-col gap-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-4 rounded-xl
                  bg-white/10 border border-white/15 hover:bg-white/20 transition"
                >
                  <div>
                    <p className="font-medium">{tx.type} {tx.coin}</p>
                    <p className="text-xs text-white/60">{tx.date}</p>
                  </div>
                  <p className="font-bold text-cyan-300">${tx.amount}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">Insights</h3>

          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white/10 backdrop-blur-xl border border-white/15
              rounded-xl overflow-hidden hover:bg-white/20 transition cursor-pointer"
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
    </div>
  );
};

export default StablecoinDashboard;
