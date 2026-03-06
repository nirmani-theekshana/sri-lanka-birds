import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BirdCard from '../components/BirdCard';
import api from '../api';
import './HomePage.css';

const HomePage = () => {
  const [recentBirds, setRecentBirds] = useState([]);

  useEffect(() => {
    api.get('/api/birds/recently-visited')
      .then(res => setRecentBirds(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Sri Lanka's Endemic Birds</h1>
          <p>Explore the 33 unique bird species found only in the pearl of the Indian Ocean</p>
          <a href="/endemic-birds" className="hero-btn">Explore All Birds →</a>
        </div>
      </section>
      <section className="recent-section">
        <h2>Recently Visited</h2>
        {recentBirds.length === 0 ? (
          <p className="empty-msg">Start exploring birds and they will appear here!</p>
        ) : (
          <div className="cards-grid">
            {recentBirds.map(bird => <BirdCard key={bird.id} bird={bird} />)}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;