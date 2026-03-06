import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';
import './ContactPage.css';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact', form);
      setStatus({ type: 'success', msg: 'Message sent! We will reply soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ type: 'error', msg: 'Failed to send. Please try again.' });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-page">
        <h1>Contact Us</h1>
        <p>Have questions or suggestions? We would love to hear from you!</p>
        {status.msg && <div className={`alert ${status.type}`}>{status.msg}</div>}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" value={form.name}
            onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email}
            onChange={handleChange} required />
          <textarea name="message" placeholder="Your message..." rows="6"
            value={form.message} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;