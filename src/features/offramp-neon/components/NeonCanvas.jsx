export default function NeonCanvas({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Radial gradient glow in center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(20, 30, 60, 0.4) 0%, rgba(10, 14, 26, 0) 70%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}