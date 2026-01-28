export default function Modal({ open, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "420px",
        }}
      >
        {children}
      </div>
    </div>
  );
}