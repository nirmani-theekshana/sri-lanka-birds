import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BirdCard from '../components/BirdCard';
import api from '../api';
import './EndemicBirdsPage.css';

const EndemicBirdsPage = () => {
  const [birds, setBirds] = useState([]);
  const [families, setFamilies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/birds/families').then(res => setFamilies(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get('/api/birds', { params: { search, family_id: selectedFamily } })
      .then(res => { setBirds(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, selectedFamily]);

  return (
    <div>
      <Navbar />
      <div className="endemic-page">
        <h1>Endemic Birds of Sri Lanka</h1>
        <p className="subtitle">33 species found nowhere else on Earth</p>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedFamily}
            onChange={e => setSelectedFamily(e.target.value)}
            className="family-select"
          >
            <option value="">All Families</option>
            {families.map(f => (
              <option key={f.id} value={f.id}>{f.common_family_name}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Loading birds...</p>
        ) : (
          <div className="birds-grid">
            {birds.length === 0
              ? <p>No birds found matching your search.</p>
              : birds.map(bird => <BirdCard key={bird.id} bird={bird} />)
            }
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EndemicBirdsPage;