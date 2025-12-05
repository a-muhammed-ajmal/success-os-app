import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import { PRIORITY_LEVELS } from '../lib/constants';
import db from '../lib/db';

export default function Priorities() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'important',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    isFocus: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.tasks.add({
        ...formData,
        status: 'todo',
        createdAt: new Date()
      });
      setFormData({
        title: '',
        description: '',
        priority: 'important',
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        isFocus: false
      });
      setShowForm(false);
      window.location.reload(); // Quick refresh
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>Priorities</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label">Task Title *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                className="input-field"
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Priority</label>
                <select
                  className="input-field"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  {PRIORITY_LEVELS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Due Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFocus"
                checked={formData.isFocus}
                onChange={(e) => setFormData({ ...formData, isFocus: e.target.checked })}
              />
              <label htmlFor="isFocus" className="text-sm">
                Add to Today's Focus (max 3)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1">
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

      <TaskList />
    </div>
  );
}
