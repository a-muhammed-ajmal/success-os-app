import GreetingHeader from '../components/dashboard/GreetingHeader';
import KickstartQuotes from '../components/dashboard/KickstartQuotes';
import KPICards from '../components/dashboard/KPICards';
import TodaysFocus from '../components/dashboard/TodaysFocus';
import WinnersMindset from '../components/dashboard/WinnersMindset';
import GetThingsDone from '../components/dashboard/GetThingsDone';

export default function Dashboard() {
  return (
    <div>
      <GreetingHeader />
      <KickstartQuotes />
      <KPICards />
      <TodaysFocus />
      <WinnersMindset />
      <GetThingsDone />
    </div>
  );
}
