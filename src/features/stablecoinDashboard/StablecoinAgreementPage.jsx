import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


/* ======================================================
   STABLECOIN AGREEMENT MODAL
   ====================================================== */

export function StablecoinAgreementModal({ open, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [checks, setChecks] = useState({
    terms: false,
    risks: false,
    fees: false,
  });

  const allChecked = Object.values(checks).every(Boolean);

  useEffect(() => {
    if (!open) return;

    const esc = (e) => e.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => {
    setChecks({ ...checks, [e.target.name]: e.target.checked });
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

      const customerId = localStorage.getItem("customerId");

      const res = await axios.post(
        `${apiUrl}auth/create_wallet/${customerId}`
      );

      if (res?.status >= 200 && res?.status < 300) {
        localStorage.setItem("wallet_address", res?.data?.wallet_address);

        onClose();

        // full refresh so dashboard fetches new wallet
        window.location.reload();
      }
    } catch (err) {
      console.error("Wallet creation error:", err);
      alert("Failed to create wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl p-8 text-white border border-white/10 shadow-2xl bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Stablecoin User Agreement</h2>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-white/70 mb-4">
          Please review and accept before wallet activation.
        </p>

        <div className="h-48 overflow-y-auto border border-white/15 rounded-lg p-4 text-xs text-white/80 mb-6 bg-white/5">
          <p className="mb-2 font-medium">Agreement Summary</p>
          <p className="mb-2">
            Demo stablecoins simulate assets like USDC/USDT/DAI.
          </p>
          <p className="mb-2">Tokens shown have no real monetary value.</p>
          <p className="mb-2">
            Simulated blockchain fees and confirmations may appear.
          </p>
          <p>Intended strictly for testing, education, and UI demos.</p>
        </div>

        <div className="space-y-3 mb-6 text-xs">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              onChange={handleChange}
              className="mt-1 accent-cyan-400"
            />
            <span>I agree to stablecoin terms</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="risks"
              onChange={handleChange}
              className="mt-1 accent-cyan-400"
            />
            <span>I understand risks</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="fees"
              onChange={handleChange}
              className="mt-1 accent-cyan-400"
            />
            <span>I accept network fees</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard", { replace: true })}
            className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            disabled={!allChecked || loading}
            onClick={handleConfirm}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              allChecked
                ? "bg-[#d93069] hover:brightness-110"
                : "bg-[#d93069]/50 cursor-not-allowed"
            }`}
          >
            {loading ? "Creating Wallet..." : "Confirm & Create Wallet"}
          </button>
        </div>

        <p className="text-[10px] text-white/60 mt-4 text-center">
          Demo only · No real crypto created
        </p>
      </div>
    </div>
  );
}

/* ======================================================
   AGREEMENT PAGE WRAPPER (ROUTE PAGE)
   ====================================================== */

export function StablecoinAgreementPage() {
  const navigate = useNavigate();

  return (
    <StablecoinAgreementModal
      open={true}
      onClose={() => navigate("/dashboard/stablecoin", { replace: true })}
    />
  );
}