import { useEffect, useState } from 'react';
import db from '../../lib/db';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const loadTasks = async () => {
    try {
      let query = db.tasks;
      if (filter === 'todo') {
        query = query.where('status').equals('todo');
      } else if (filter === 'done') {
        query = query.where('status').equals('done');
      }
      const data = await query.sortBy('dueDate');
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
