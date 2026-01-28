export const ENDPOINTS = {
  // ---------- Auth ----------
  ME: "/api/me",

  // Login
  LOGIN: "/auth/login",

  // Sign Up
  SIGNUP: "/auth/register",

  // ---------- Wallet ----------
  BALANCES: "/api/balances",

  // ---------- Stablecoin Catalog ----------
  STABLECOINS: "/api/stablecoins",

  // ---------- On-Ramp (Payment-based) ----------
  BUY_STABLECOINS: "/api/onramp/buy",

  // ---------- Transactions ----------
  TRANSACTIONS: "/api/transactions",


  
  TRANSACTION_BY_ID: (id) => `/api/transactions/${id}`,
};