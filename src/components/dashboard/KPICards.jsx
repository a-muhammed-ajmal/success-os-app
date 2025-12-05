import { useEffect, useState } from 'react';
import db from '../../lib/db';
import { differenceInDays } from 'date-fns';

export default function KPICards() {
  const [kpis, setKpis] = useState({
    dealsProcessing: 0,
    daysRemaining: 0,
    dealsWon: 0
  });

  useEffect(() => {
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      const deals = await db.deals.toArray();
      const settings = await db.settings.get('salesCycleEnd');
      
      const processing = deals
        .filter(d => d.status === 'processing')
        .reduce((sum, d) => sum + (d.value || 0), 0);
      
      const won = deals.filter(d => d.status === 'completed').length;
      
      const endDate = settings ? new Date(settings.value) : new Date();
      const daysLeft = Math.max(0, differenceInDays(endDate, new Date()));

      setKpis({
        dealsProcessing: processing,
        daysRemaining: daysLeft,
        dealsWon: won
      });
    } catch (error) {
      console.error('Error loading KPIs:', error);
    }
  };

  const cards = [
    {
      label: 'Deals Processing',
      value: `AED ${kpis.dealsProcessing.toLocaleString()}`,
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-700'
    },
    {
      label: 'Days Remaining',
      value: kpis.daysRemaining,
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-700'
    },
    {
      label: 'Done Successfully',
      value: kpis.dealsWon,
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.color} border rounded-lg p-3 md:p-4`}
        >
          <p className="text-[10px] md:text-xs text-gray-600 mb-1 md:mb-2 font-medium">
            {card.label}
          </p>
          <p className={`text-lg md:text-2xl font-bold ${card.textColor}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
