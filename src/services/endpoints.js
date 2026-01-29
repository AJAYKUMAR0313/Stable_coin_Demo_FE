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
  // BUY_STABLECOINS: (address) =>`/wallet/free-tokens/${address}`,
  BUY_STABLECOINS: `/wallet/free-tokens/address`,

  // ---------- Transactions ----------
  TRANSACTIONS: "/api/transactions",


  
  TRANSACTION_BY_ID: (id) => `/api/transactions/${id}`,

  // Transfer endpoints
  TRANSFER_TOKENS: "/wallet/transfer",
  GET_WALLET_TOKENS: (address)=> `/wallet/balance/${address}`,
  VERIFY_ADDRESS: (address) =>`/api/wallet/verify-address/${address}`,
  
}