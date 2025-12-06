import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../lib/db';
import { format } from 'date-fns';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

export default function GetThingsDone() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const allTasks = await db.tasks
        .where('status')
        .equals('todo')
        .toArray();

      allTasks.sort((a, b) => {
        const timeA = new Date(a.dueDate).getTime();
        const timeB = new Date(b.dueDate).getTime();

        if (isNaN(timeA)) return 1;
        if (isNaN(timeB)) return -1;

        return timeA - timeB;
      });
        
      setTasks(allTasks.slice(0, 10));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const task = await db.tasks.get(taskId);
      await db.tasks.update(taskId, {
        status: task.status === 'done' ? 'todo' : 'done',
        completedAt: task.status === 'done' ? null : new Date()
      });
      loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">Get Things Done</h2>
        <button
          onClick={() => navigate('/priorities')}
          className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          View More <ArrowRight size={16} />
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No pending tasks</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
            >
              <button onClick={() => toggleTask(task.id)}>
                {task.status === 'done' ? (
                  <CheckCircle className="text-success" size={18} />
                ) : (
                  <Circle className="text-gray-400" size={18} />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </p>
                {task.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {format(new Date(task.dueDate), 'MMM d')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
