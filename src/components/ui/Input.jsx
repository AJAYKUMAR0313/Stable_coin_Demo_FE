export default function Input({ value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        fontSize: "32px",
        border: "none",
        outline: "none",
        marginTop: "8px",
      }}
    />
  );
}