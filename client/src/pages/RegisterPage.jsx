import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
 
const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
 
  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: form.username, email: form.email, password: form.password
      });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };
 
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🦜 Sri Lanka Birds</h1>
        <h2>Create Account</h2>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={form.username}
              onChange={handleChange} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="Min 6 characters" required />
          </div>
             <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm" value={form.confirm}
              onChange={handleChange} placeholder="Repeat password" required />
          </div>
          <button type="submit" className="btn-primary">Create Account</button>
        </form>
        <p>Already registered? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};
 
export default RegisterPage;

