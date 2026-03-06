import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
 
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
 
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";
 
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">🦜</span>
        <span>Sri Lanka Birds</span>
      </div>
      <ul className="nav-links">
        <li><Link className={isActive("/")} to="/">Home</Link></li>
        <li><Link className={isActive("/endemic-birds")} to="/endemic-birds">Endemic Birds</Link></li>
        <li><Link className={isActive("/about-birds")} to="/about-birds">About Birds</Link></li>
        <li><Link className={isActive("/contact")} to="/contact">Contact Us</Link></li>
      </ul>
      <div className="nav-user">
        <span className="nav-username">Welcome, {user?.username}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};



export default Navbar;

