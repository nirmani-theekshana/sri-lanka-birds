import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';
 
const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe
      });
      login(res.data.user, res.data.token, form.rememberMe);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🦜 Sri Lanka Birds</h1>
        <h2>Welcome Back</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="••••••••" required />
          </div>
          <div className="form-check">
            <input type="checkbox" name="rememberMe" id="rememberMe"
              checked={form.rememberMe} onChange={handleChange} />
            <label htmlFor="rememberMe">Remember me for 7 days</label>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
                   </button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register here</Link></p>
      </div>
    </div>
  );
};
 
export default LoginPage;

