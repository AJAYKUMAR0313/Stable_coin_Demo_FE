import Input from "@/components/ui/Input";
import { useOnRampStore } from "../onrampStore";

export default function TokenAmountInput() {
  const { tokenAmount, setTokenAmount } = useOnRampStore();

  return (
    <Input
      type="number"
      value={tokenAmount}
      onChange={(e) => setTokenAmount(e.target.value)}
    />
  );
}