import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = ["Home","Accounts", "Cards",  "Loans", "Invest", "Insure"];

  const isActive = (tab) =>
    location.pathname.toLowerCase().includes(tab.toLowerCase());

  return (
    <div
      className="px-10 py-4 flex items-center
      bg-[#0B2A5B]/60 backdrop-blur-xl
      border-b border-white/10"
    >
      <div className="flex gap-3 flex-wrap">

        {/* NAV TABS */}
        {tabs.map((item, i) => (
          <button
            key={i}
            className={`
              px-5 py-2 rounded-full text-sm font-medium
              border border-white/15 backdrop-blur-md
              transition-all duration-200
              ${
                isActive(item)
                  ? "bg-white/20 text-white shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105"
              }
              ${item === "Home" ? "cursor-pointer" : "cursor-not-allowed"}
            `}
            onClick={() => {
              if (item?.toLowerCase() === "home") {
                navigate("/dashboard");
              }
            }}
          >
            {item}
          </button>
        ))}

        {/* STABLECOINS CTA */}
        <button
          onClick={() => navigate("/dashboard/stablecoin")}
          className="px-5 py-2 rounded-full text-sm font-semibold
            bg-gradient-to-r from-cyan-400 to-blue-600
            text-black shadow-lg
            hover:scale-105 transition cursor-pointer"
        >
          StableCoins
        </button>
      </div>
    </div>
  );
}
