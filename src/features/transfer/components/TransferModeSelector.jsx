import { useTransferStore } from "../transferStore";
function TransferModeSelector() {
  const { transferMode, setTransferMode } = useTransferStore();

  const modes = [
    { key: "WALLET", label: "Wallet Address" },
    { key: "PAYEE", label: "Payee" },
    { key: "SEARCH", label: "Search" },
  ];

  return (
    <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => setTransferMode(m.key)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition
            ${
              transferMode === m.key
                ? "bg-cyan-500 text-black"
                : "text-white/70 hover:bg-white/10"
            }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
export default TransferModeSelector;