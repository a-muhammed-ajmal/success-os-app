import ExpenseTracker from '../components/finance/ExpenseTracker';
import IncomeTracker from '../components/finance/IncomeTracker';

export default function Finance() {
  return (
    <div>
      <h1 className="mb-4">Finance</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IncomeTracker />
        <ExpenseTracker />
      </div>
    </div>
  );
}
