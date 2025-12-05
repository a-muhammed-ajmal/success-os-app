import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function GreetingHeader() {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Champion');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="mb-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {greeting}, {userName}
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        {format(new Date(), 'EEEE, MMMM d, yyyy')}
      </p>
    </div>
  );
}
