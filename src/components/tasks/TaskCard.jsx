import { format } from 'date-fns';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { PRIORITY_LEVELS } from '../../lib/constants';

export default function TaskCard({ task, onToggle, onDelete }) {
  const priority = PRIORITY_LEVELS.find(p => p.value === task.priority);

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <button onClick={() => onToggle(task.id)} className="mt-0.5">
          {task.status === 'done' ? (
            <CheckCircle className="text-success" size={20} />
          ) : (
            <Circle className="text-gray-400" size={20} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {priority && (
              <span
                className="text-[10px] px-2 py-0.5 rounded"
                style={{ backgroundColor: priority.color + '20', color: priority.color }}
              >
                {priority.label}
              </span>
            )}
            {task.dueDate && (
              <span className="text-[10px] text-gray-500">
                Due: {format(new Date(task.dueDate), 'MMM d')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
