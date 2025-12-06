import Dexie from 'dexie';

export const db = new Dexie('SuccessOSDB');

db.version(1).stores({
  leads: '++id, fullName, company, mobile, status, createdAt, synced',
  deals: '++id, fullName, status, submittedDate, value, synced',
  connections: '++id, fullName, email, mobile, synced',
  tasks: '++id, title, priority, dueDate, status, isFocus, synced',
  expenses: '++id, amount, category, date, synced',
  income: '++id, amount, source, date, synced',
  settings: 'key, value'
});

db.version(2).stores({
  leads: '++id, fullName, company, mobile, status, createdAt, synced',
  deals: '++id, fullName, status, submittedDate, value, synced',
  connections: '++id, fullName, email, mobile, synced',
  tasks: '++id, title, priority, dueDate, status, isFocus, synced',
  expenses: '++id, amount, category, date, synced',
  income: '++id, amount, source, date, synced',
  settings: 'key, value'
}).upgrade(async (tx) => {
  // Migrate tasks to ensure isFocus is always a boolean
  const tasks = await tx.tasks.toArray();
  for (const task of tasks) {
    if (task.isFocus === undefined || task.isFocus === null) {
      await tx.tasks.update(task.id, { isFocus: false });
    }
  }
});

export const initDB = async () => {
  try {
    const existing = await db.settings.get('initialized');
    if (!existing) {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      
      await db.settings.bulkPut([
        { key: 'initialized', value: true },
        { key: 'salesCycleStart', value: now.toISOString() },
        { key: 'salesCycleEnd', value: nextMonth.toISOString() },
        { key: 'userName', value: 'Champion' }
      ]);
    }
  } catch (error) {
    console.error('DB initialization error:', error);
  }
};

export default db;
