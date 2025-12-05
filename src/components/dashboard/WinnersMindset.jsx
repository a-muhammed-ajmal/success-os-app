import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AFFIRMATIONS } from '../../lib/constants';

export default function WinnersMindset() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-base font-semibold">The Winner's Mindset</h2>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isOpen && (
        <ol className="mt-3 space-y-2 text-sm text-gray-700">
          {AFFIRMATIONS.map((affirmation, i) => (
            <li key={i} className="leading-relaxed">
              <span className="font-medium text-primary">{i + 1}.</span> {affirmation}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
