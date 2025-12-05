import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import db from '../../lib/db';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    source: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await db.expenses.orderBy('date').reverse().toArray();
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.expenses.add({
        ...formData,
        amount: parseFloat(formData.amount),
        createdAt: new Date()
      });
      setFormData({
        amount: '',
        category: '',
        description: '',
        source: '',
        date: format(new Date(), 'yyyy-MM-dd')
      });
      setShowForm(false);
      loadExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    if (confirm('Delete this expense?')) {
      await db.expenses.delete(id);
      loadExpenses();
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-semibold">Expenses</h2>
          <p className="text-xs text-gray-600">Total: AED {total.toLocaleString()}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs px-3 py-1.5"
        >
          <Plus size={14} />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-gray-50 rounded space-y-2">
          <input
            type="number"
            step="0.01"
            required
            placeholder="Amount"
            className="input-field"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Category"
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="input-field"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Source/Method"
            className="input-field"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          />
          <input
            type="date"
            required
            className="input-field"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <button type="submit" className="btn-primary w-full text-sm">Add Expense</button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Category</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b last:border-0">
                <td className="py-2">{format(new Date(expense.date), 'MMM d')}</td>
                <td className="py-2">
                  <div>{expense.category}</div>
                  {expense.description && (
                    <div className="text-gray-500 text-[10px]">{expense.description}</div>
                  )}
                </td>
                <td className="text-right py-2 font-medium">
                  AED {expense.amount.toLocaleString()}
                </td>
                <td className="text-right py-2">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length === 0 && (
          <p className="text-center py-4 text-gray-500 text-xs">No expenses yet</p>
        )}
      </div>
    </div>
  );
}
