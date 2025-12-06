import { useEffect, useState } from 'react';
import db from '../../lib/db';
import TaskCard from './TaskCard';

export default function TaskList({ refreshCounter }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, [filter, refreshCounter]);

  const loadTasks = async () => {
    try {
      let data;
      if (filter === 'all') {
        data = await db.tasks.toArray();
      } else {
        data = await db.tasks.where('status').equals(filter).toArray();
      }

      // Manual sort to prevent errors from invalid dueDates like ''
      data.sort((a, b) => {
        const timeA = new Date(a.dueDate).getTime();
        const timeB = new Date(b.dueDate).getTime();

        // Treat invalid dates as "greater than" valid dates
        if (isNaN(timeA)) return 1;
        if (isNaN(timeB)) return -1;

        return timeA - timeB;
      });

      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = await db.tasks.get(id);
      await db.tasks.update(id, {
        status: task.status === 'done' ? 'todo' : 'done',
        completedAt: task.status === 'done' ? null : new Date()
      });
      loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    if (confirm('Delete this task?')) {
      await db.tasks.delete(id);
      loadTasks();
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded text-sm ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('todo')}
          className={`px-3 py-1.5 rounded text-sm ${
            filter === 'todo' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
        >
          To Do
        </button>
        <button
          onClick={() => setFilter('done')}
          className={`px-3 py-1.5 rounded text-sm ${
            filter === 'done' ? 'bg-primary text-white' : 'bg-gray-200'
          }`}
        >
          Done
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-center py-8 text-gray-500">No tasks found</p>
      )}
    </div>
  );
}
