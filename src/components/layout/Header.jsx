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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

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
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className=" px-4 py-2 rounded-lg "
        >
          <h1 className="text-3xl font-extrabold text-gray-800">Demo Stable</h1>
        </button>

        {/* Email + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="px-4 py-2 rounded-lg cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-700">{user.email}</p>
          </div>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
              {/* Address Row */}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div className="text-xs text-gray-500 break-all">
                  {shortedAddress(user.wallet_address)}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                    setOpen(false);
                  }}
                  className="ml-2 p-1 rounded hover:bg-gray-200"
                  title="Copy address"
                >
                  📋
                </button>
              </div>

              <div className="border-t" />

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
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
