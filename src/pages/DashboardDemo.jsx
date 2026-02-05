import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardDemo() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4] text-white">

      <div className="px-10 py-8 flex gap-10">

        {/* LEFT SECTION */}
        <div className="flex-1">

          {/* CATEGORY PILLS */}
          <div className="flex gap-3 flex-wrap">
            {["Accounts", "Cards", "FD/RD", "Loans", "Invest", "Insure"].map(
              (item, i) => (
                <button
                  key={i}
                  className="px-5 py-2 rounded-full text-sm font-medium
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  hover:bg-white/20 hover:scale-105
                  transition-all duration-200"
                >
                  {item}
                </button>
              )
            )}

            <button
              className="px-5 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-cyan-400 to-blue-600
              text-black shadow-lg hover:scale-105 transition"
              onClick={() => navigate("/dashboard/stablecoin")}
            >
              StableCoins
            </button>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            {/* SAVINGS */}
            <div className="group bg-white/15 backdrop-blur-xl border border-white/20
              rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-80">Savings Account</p>
              <p className="text-xl tracking-widest mt-2 font-semibold">
                XXXXXXXX
              </p>

              <button
                className="mt-6 px-4 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-sm font-medium transition"
              >
                Get Statement
              </button>
            </div>

            {/* CREDIT CARD */}
            <div className="group bg-gradient-to-br from-[#7F63FF]/80 to-[#5A3FFF]/80
              backdrop-blur-xl border border-white/20
              rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-90">Split your Credit Card bill</p>
              <p className="text-lg font-semibold mt-1">Pay in parts</p>

              <button
                className="mt-6 px-4 py-2 rounded-lg
                bg-white text-[#5A3FFF]
                text-sm font-semibold hover:bg-gray-100 transition"
              >
                Convert Now
              </button>
            </div>

            {/* SUPPORT */}
            <div className="group bg-white/15 backdrop-blur-xl border border-white/20
              rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-80">Your One-Stop Platform</p>
              <p className="text-lg font-semibold mt-1">
                Banking Support
              </p>

              <button
                className="mt-6 px-4 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-sm font-medium transition"
              >
                Access Support Hub
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 self-start bg-white/15 backdrop-blur-xl
          border border-white/20 rounded-2xl p-6 shadow-2xl">

          <h3 className="text-lg font-semibold mb-5">
            My Favourite Links
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              "Account Statement",
              "Open FD",
              "Download FD Summary",
              "Sweep-in / OD against FD",
              "CASA Interest Certificate",
            ].map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center
                px-3 py-2 rounded-lg
                hover:bg-white/10 cursor-pointer transition"
              >
                <span>{item}</span>
                <span className="opacity-60">›</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition">
            + Add & Edit Links
          </button>
        </div>

      </div>
    </div>
  );
}
