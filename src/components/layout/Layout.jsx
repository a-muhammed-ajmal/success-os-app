import { useLocation } from 'react-router-dom';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import FAB from './FAB';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-6 md:pl-64">
        <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* FAB */}
      <FAB />
    </div>
  );
}
