import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'task', label: 'Add Task', icon: '‚úÖ', color: 'bg-blue-500' },
    { id: 'lead', label: 'Add Lead', icon: 'Ì±§', color: 'bg-green-500' },
    { id: 'income', label: 'Add Income', icon: 'Ì≤µ', color: 'bg-emerald-500' },
    { id: 'expense', label: 'Add Expense', icon: 'Ì≤≥', color: 'bg-red-500' },
    { id: 'note', label: 'Add Note', icon: 'Ì≥ù', color: 'bg-yellow-500' },
  ];

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                setIsOpen(false);
                console.log('Add', action.id);
              }}
              className={`flex items-center gap-2 ${action.color} text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform text-sm font-medium whitespace-nowrap`}
            >
              <span className="text-lg">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-700' : 'bg-primary'
        } text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center`}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
}
