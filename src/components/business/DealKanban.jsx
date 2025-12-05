import { useEffect, useState } from 'react';
import { DEAL_STATUSES } from '../../lib/constants';
import db from '../../lib/db';

export default function DealKanban() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const allDeals = await db.deals.toArray();
      setDeals(allDeals);
    } catch (error) {
      console.error('Error loading deals:', error);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max">
        {DEAL_STATUSES.map((status) => {
          const statusDeals = deals.filter(d => d.status === status.value);
          return (
            <div key={status.value} className="w-64 flex-shrink-0">
              <div
                className="rounded-lg p-2 mb-2"
                style={{ backgroundColor: status.color + '20', borderLeft: `3px solid ${status.color}` }}
              >
                <h3 className="text-xs font-semibold">{status.label}</h3>
                <span className="text-xs text-gray-600">{statusDeals.length}</span>
              </div>

              <div className="space-y-2">
                {statusDeals.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No deals</p>
                ) : (
                  statusDeals.map((deal) => (
                    <div key={deal.id} className="card cursor-pointer hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-sm">{deal.fullName}</h4>
                      <p className="text-xs text-gray-600 mt-1">{deal.productType || 'N/A'}</p>
                      {deal.value && (
                        <p className="text-xs font-medium text-primary mt-1">
                          AED {deal.value.toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
