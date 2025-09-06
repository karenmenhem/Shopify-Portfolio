import '../assets/styles/Navbar.css';

export default function Navbar({ setPage, page, isAdmin, setIsAdmin }) {
  return (
    <nav className="navbar">
      <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
      <button className={page === 'about' ? 'active' : ''} onClick={() => setPage('about')}>About</button>
      <button className={page === 'admin' ? 'active' : ''} onClick={() => setPage('admin')}>Admin</button>
    </nav>
  );
}
