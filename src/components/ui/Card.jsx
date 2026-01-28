export default function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}