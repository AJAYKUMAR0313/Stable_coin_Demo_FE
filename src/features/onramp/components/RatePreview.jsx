import { Text } from "@/components/ui/Text";
import { useOnRampStore } from "../onrampStore";

const PRICE = 83;

export default function RatePreview() {
  const { tokenAmount } = useOnRampStore();

  if (!tokenAmount) return null;

  return (
    <>
      <Text.Muted>₹{PRICE} per token</Text.Muted>
      <Text.Title>₹{tokenAmount * PRICE}</Text.Title>
    </>
  );
}