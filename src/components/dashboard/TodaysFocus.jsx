import { useEffect, useState } from 'react';
import db from '../../lib/db';
import { CheckCircle, Circle } from 'lucide-react';

export default function TodaysFocus() {
  const [focusTasks, setFocusTasks] = useState([]);

  useEffect(() => {
    loadFocusTasks();
  }, []);

  const loadFocusTasks = async () => {
    try {
      const tasks = await db.tasks.toArray();
      const focusTasks = tasks
        .filter(t => t.isFocus === true && t.status !== 'done')
        .slice(0, 3);
      setFocusTasks(focusTasks);
    } catch (error) {
      console.error('Error loading focus tasks:', error);
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const task = await db.tasks.get(taskId);
      await db.tasks.update(taskId, {
        status: task.status === 'done' ? 'todo' : 'done',
        completedAt: task.status === 'done' ? null : new Date()
      });
      loadFocusTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <div className="card mb-4">
      <h2 className="text-base font-semibold mb-3">Today's Focus</h2>
      {focusTasks.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          What are your 3 non-negotiables today?
        </p>
      ) : (
        <div className="space-y-2">
          {focusTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-2 rounded hover:bg-gray-50"
            >
              <button onClick={() => toggleTask(task.id)}>
                {task.status === 'done' ? (
                  <CheckCircle className="text-success" size={20} />
                ) : (
                  <Circle className="text-gray-400" size={20} />
                )}
              </button>
              <span className={`flex-1 text-sm ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
