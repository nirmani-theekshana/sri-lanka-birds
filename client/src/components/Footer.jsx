import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <span>🦜 Sri Lanka Endemic Birds</span>
        <p>Celebrating the unique avian biodiversity of Sri Lanka</p>
      </div>
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/endemic-birds">Endemic Birds</a>
        <a href="/about-birds">About Birds</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 Sri Lanka Birds. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;