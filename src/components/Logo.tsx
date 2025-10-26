const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      <img 
        src="/botmuselogo.png" 
        alt="Bot Muse Logo" 
        className="h-12 w-auto transition-all duration-300 hover:scale-105 brightness-125 contrast-125 drop-shadow-lg"
        style={{
          filter: 'brightness(1.4) contrast(1.3) drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))'
        }}
      />
    </div>
  );
};

export default Logo;
