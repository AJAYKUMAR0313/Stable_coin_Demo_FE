import React, { useState } from 'react';

const StablecoinDashboard = () => {

  const stablecoins = [
    { name: 'USDC', balance: 1352, change: '+2.5%', icon: '🔵' },
    { name: 'USDT', balance: 123, change: '+1.2%', icon: '🟢' },
    { name: 'JPM', balance: 11, change: '+0.8%', icon: '🔷' }
  ];

  const articles = [
    {
      id: 1,
      title: "Understanding Stablecoins: A Beginner's Guide",
      excerpt: "Stablecoins are cryptocurrencies designed to maintain a stable value by pegging to traditional currencies like USD or commodities.",
      date: "Feb 5, 2026",
      readTime: "5 min read",
      category: "Education",
      image: "📚"
    },
    {
      id: 2,
      title: "USDC vs USDT: Which Stablecoin Should You Choose?",
      excerpt: "Compare the two largest stablecoins in the market. Learn about their backing, transparency, and use cases.",
      date: "Feb 4, 2026",
      readTime: "7 min read",
      category: "Comparison",
      image: "⚖️"
    },
    {
      id: 3,
      title: "How Banks Are Adopting Stablecoin Technology",
      excerpt: "Major financial institutions are integrating stablecoins for faster, cheaper international transfers and settlements.",
      date: "Feb 3, 2026",
      readTime: "6 min read",
      category: "Industry",
      image: "🏦"
    },
    {
      id: 4,
      title: "Regulatory Landscape for Stablecoins in 2026",
      excerpt: "Recent regulatory developments and what they mean for stablecoin users and investors worldwide.",
      date: "Feb 2, 2026",
      readTime: "8 min read",
      category: "Regulation",
      image: "📋"
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Buy', coin: 'USDC', amount: 500, date: 'Today, 10:30 AM' },
    { id: 2, type: 'Transfer', coin: 'USDT', amount: 50, date: 'Yesterday, 3:45 PM' },
    { id: 3, type: 'Convert', coin: 'JPM', amount: 5, date: 'Feb 3, 11:20 AM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]">

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        <main className="lg:col-span-3 flex flex-col gap-6">

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-purple-500 to-purple-800 rounded-2xl p-7 text-white shadow-lg shadow-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium opacity-90">Fiat Balance</span>
                <span className="text-3xl">💵</span>
              </div>
              <div className="text-5xl font-bold mb-2 tracking-tight">₹32,451</div>
            </div>

            <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl p-7 text-white shadow-lg shadow-pink-500/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium opacity-90">Total Stablecoins</span>
                <span className="text-3xl">🪙</span>
              </div>
              <div className="text-5xl font-bold mb-2 tracking-tight">$1,486</div>
            </div>
          </div>

          {/* Stablecoin Holdings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Your Stablecoin Holdings</h2>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stablecoins.map(coin => (
                <div 
                  key={coin.name} 
                  className="p-5 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{coin.icon}</span>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{coin.name}</div>
                      <div className="text-xs text-green-600 font-semibold">{coin.change}</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-3">${coin.balance}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Quick Services</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-sm font-bold text-gray-900 mb-1">Buy Stablecoins</div>
                <div className="text-xs text-gray-600 leading-snug">Purchase USDC, USDT & more</div>
              </button>
              <button className="p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center">
                <div className="text-4xl mb-3">💱</div>
                <div className="text-sm font-bold text-gray-900 mb-1">Transfer</div>
                <div className="text-xs text-gray-600 leading-snug">Send to wallet or bank</div>
              </button>
              <button className="p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center">
                <div className="text-4xl mb-3">💵</div>
                <div className="text-sm font-bold text-gray-900 mb-1">Convert to Fiat</div>
                <div className="text-xs text-gray-600 leading-snug">Cash out your holdings</div>
              </button>
              <button className="p-6 rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center">
                <div className="text-4xl mb-3">📊</div>
                <div className="text-sm font-bold text-gray-900 mb-1">Analytics</div>
                <div className="text-xs text-gray-600 leading-snug">Track your portfolio</div>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {recentTransactions.map(tx => (
                <div 
                  key={tx.id} 
                  className="flex justify-between items-center p-4 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {tx.type === 'Buy' ? '📥' : tx.type === 'Transfer' ? '↔️' : '🔄'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {tx.type} {tx.coin}
                      </div>
                      <div className="text-xs text-gray-600">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">${tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar - 1/4 */}
        <aside className="hidden lg:flex flex-col gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 border-b-3 border-blue-600 pb-2.5">
              Stablecoin Insights
            </h3>
          </div>
          
          <div className="flex flex-col gap-4">
            {articles.map(article => (
              <div 
                key={article.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
              >
                <div className="bg-gray-100 p-8 text-center text-5xl border-b border-gray-200">
                  {article.image}
                </div>
                <div className="p-4">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wide mb-2.5">
                    {article.category}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2.5">
                    {article.excerpt}
                  </p>
                  <div className="flex gap-1.5 text-[10px] text-gray-400">
                    <span className="font-medium">{article.date}</span>
                    <span className="font-medium">• {article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StablecoinDashboard;