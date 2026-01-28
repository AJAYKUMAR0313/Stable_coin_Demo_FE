import apiClient from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";

/**
 * Fetch supported stablecoins available for purchase
 */
export async function fetchSupportedStablecoins() {
  const response = await apiClient.get(ENDPOINTS.STABLECOINS);
  return response.data;
}

/**
 * Buy stablecoins (demo on-ramp)
 * Payment is mocked on frontend
 * Backend credits tokens via testnet faucet
 */
export async function buyStablecoins({
  tokenSymbol,
  tokenAmount,
}) {
  if (!tokenSymbol) {
    throw new Error("Token symbol is required");
  }

  if (!tokenAmount || tokenAmount <= 0) {
    throw new Error("Invalid token amount");
  }

  const response = await apiClient.post(ENDPOINTS.BUY_STABLECOINS, {
    tokenSymbol,
    tokenAmount,
  });

  return response.data;
}