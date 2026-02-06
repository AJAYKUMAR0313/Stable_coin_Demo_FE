export default function ProcessingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="text-center">
        {/* Pulsing Orb */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div 
            className="absolute inset-0 rounded-full animate-pulse-orb"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #3b82f6 100%)',
              boxShadow: '0 0 40px rgba(236, 72, 153, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)',
            }}
          />
          <div 
            className="absolute inset-4 rounded-full"
            style={{
              background: '#0a0e1a',
            }}
          />
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Converting...
        </h3>
        <p className="text-gray-400">
          Please wait while we process your transaction
        </p>
      </div>
    </div>
  );
}