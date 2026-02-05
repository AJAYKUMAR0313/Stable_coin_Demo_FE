import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const shortedAddress = (address, start = 4, end = 4) => {
    if (!address) return "";
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(user.wallet_address);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#071D3A]/70 border-b border-white/10">
      <div className="px-8 py-2 flex justify-between items-center">

        {/* LOGO */}
        <button onClick={() => navigate("/dashboard")} className="group">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            StableBank
          </h1>
          <span className="block h-0.5 w-0 group-hover:w-full bg-cyan-400 transition-all" />
        </button>

        {/* USER PILL */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-4 py-2
            rounded-full cursor-pointer
            bg-white/10 backdrop-blur-md
            border border-white/15
            hover:bg-white/20 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold text-[#071D3A]">
              {user.email?.[0]?.toUpperCase()}
            </div>

            <div className="text-left">
              <p className="text-sm font-medium text-white">
                {user.email}
              </p>
              <p className="text-xs text-white/60">
                {shortedAddress(user.wallet_address)}
              </p>
            </div>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div
              className="absolute right-0 mt-3 w-64
              bg-[#0B2A5B]/90 backdrop-blur-xl
              border border-white/15
              rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* WALLET */}
              <div className="px-4 py-3 flex items-center justify-between hover:bg-white/10 transition">
                <div>
                  <p className="text-xs text-white/60">Wallet Address</p>
                  <p className="text-sm text-white font-mono">
                    {shortedAddress(user.wallet_address, 6, 6)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                  className="p-2 rounded-lg hover:bg-white/20 transition"
                  title="Copy address"
                >
                  📋
                </button>
              </div>

              <div className="border-t border-white/10" />

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3
                text-sm font-semibold text-red-400
                hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
