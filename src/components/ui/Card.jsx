// Card.jsx
export default function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "clamp(24px, 5vw, 40px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        border: "1px solid #f0f0f0",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}