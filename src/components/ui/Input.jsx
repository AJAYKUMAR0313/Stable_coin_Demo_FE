// Input.jsx
export default function Input({ value, onChange, type = "text", style = {}, ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      style={{
        width: "100%",
        fontSize: "32px",
        border: "none",
        outline: "none",
        fontWeight: 600,
        ...style,
      }}
      onFocus={(e) => {
        if (e.target.style.borderColor) {
          e.target.style.borderColor = "#000";
        }
      }}
      onBlur={(e) => {
        if (e.target.style.borderColor) {
          e.target.style.borderColor = "#e0e0e0";
        }
      }}
    />
  );
}