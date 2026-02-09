import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* ==============================
   REDIRECT LOADER PAGE
   ============================== */

export default function AgreementRedirectLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAgreement = async () => {
      try {
        const customerId = localStorage.getItem("customerId");

        const api =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";
        const res = await axios.get(`${api}bank_details/is_wallet`, {
          params: {
            tenant_id: localStorage.getItem("tenantId"),
            customer_id: customerId,
          },
        });

        // console.log("Agreement check response:", res);
        // const val = true; // simulate backend response
        // // const res = { data: val };

        if (res?.data?.is_wallet) {
          navigate("/dashboard/stablecoin", { replace: true });
        } else {
          navigate("/dashboard/stablecoin/check-agreement", {
            replace: true,
          });
        }
      } catch (err) {
        console.error(err);
        navigate("/dashboard", { replace: true });
      }
    };

    checkAgreement();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071D3A] via-[#0B2A5B] to-[#0666E4] text-white">
      <div className="text-center">
        <div className="animate-pulse text-lg mb-2">Checking access...</div>
        <p className="text-xs text-white/70">Please wait</p>
      </div>
    </div>
  );
}
