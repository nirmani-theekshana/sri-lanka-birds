import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BirdCard from '../components/BirdCard';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';
 
const HomePage = () => {
  const [recentBirds, setRecentBirds] = useState([]);
  const { getToken, user } = useAuth();
 
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/birds/recently-visited',
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setRecentBirds(res.data);
      } catch (err) {
        console.error('Failed to load recent birds');
      }
    };
    fetchRecent();
  }, []);
 
  return (
    <div className="home-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Sri Lanka's Endemic Birds</h1>
          <p>Explore the 33 unique bird species found only in the pearl of the Indian Ocean</p>
          <a href="/endemic-birds" className="hero-btn">Explore All Birds →</a>
        </div>
      </section>
 
      {/* Recently Visited */}
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

