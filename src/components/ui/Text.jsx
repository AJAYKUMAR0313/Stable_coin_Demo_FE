// Text.jsx
export const Text = {
  Hero: ({ children, style = {} }) => (
    <div style={{ fontSize: "48px", fontWeight: 700, ...style }}>{children}</div>
  ),

  Title: ({ children, style = {} }) => (
    <div style={{ fontSize: "20px", fontWeight: 600, ...style }}>{children}</div>
  ),

  Body: ({ children, style = {} }) => (
    <div style={{ fontSize: "16px", ...style }}>{children}</div>
  ),

  Muted: ({ children, style = {} }) => (
    <div style={{ fontSize: "14px", color: "#666", ...style }}>{children}</div>
  ),

  Label: ({ children, style = {} }) => (
    <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", ...style }}>{children}</div>
  ),
};