import { useState, useEffect } from 'react';
import { KICKSTART_QUOTES } from '../../lib/constants';

export default function KickstartQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % KICKSTART_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-xs font-semibold mb-2 opacity-90">KICKSTART THE GAME</h3>
      <p className="text-sm md:text-base font-medium leading-relaxed">
        "{KICKSTART_QUOTES[currentQuote]}"
      </p>
      <div className="flex gap-1 mt-3">
        {KICKSTART_QUOTES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === currentQuote ? 'w-6 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
