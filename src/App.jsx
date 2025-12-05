import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Priorities from './pages/Priorities';
import Professional from './pages/Professional';
import Relationship from './pages/Relationship';
import Reviews from './pages/Reviews';
import Visions from './pages/Visions';
import Wellness from './pages/Wellness';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/priorities" element={<Priorities />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/relationship" element={<Relationship />} />
          <Route path="/visions" element={<Visions />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;