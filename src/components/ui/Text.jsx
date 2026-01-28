export const Text = {
  Hero: ({ children }) => (
    <div style={{ fontSize: "48px", fontWeight: 600 }}>{children}</div>
  ),

  Title: ({ children }) => (
    <div style={{ fontSize: "20px", fontWeight: 500 }}>{children}</div>
  ),

  Muted: ({ children }) => (
    <div style={{ fontSize: "14px", color: "#666" }}>{children}</div>
  ),
};