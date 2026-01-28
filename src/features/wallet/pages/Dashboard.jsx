import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto" }}>
      <h2>Wallet Dashboard</h2>

      <Button onClick={() => navigate("/buy")}>
        Buy Stablecoins
      </Button>
    </div>
  );
}