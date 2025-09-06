import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import './assets/styles/app.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem('isAdmin') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    } catch {}
  }, [isAdmin]);

  return (
    <div className="app-container">
      <Navbar setPage={setPage} page={page} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      {page === 'home' && <Home isAdmin={false} />}
      {page === 'about' && <About />}
      {page === 'admin' && <Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
    </div>
  );
}
