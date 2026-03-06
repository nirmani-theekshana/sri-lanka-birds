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
  const [error, setError] = useState('');

  // Fetch families for dropdown
  useEffect(() => {
    api.get('/api/birds/families')
      .then(res => {
        console.log('Families loaded:', res.data);
        setFamilies(res.data);
      })
      .catch(err => {
        console.error('Families error:', err.response?.data || err.message);
      });
  }, []);

  // Fetch birds when search or family changes
  useEffect(() => {
    setLoading(true);
    setError('');

    const params = {};
    if (search.trim()) params.search = search.trim();
    if (selectedFamily) params.family_id = selectedFamily;

    console.log('Fetching birds with params:', params);

    api.get('/api/birds', { params })
      .then(res => {
        console.log('Birds loaded:', res.data.length, 'birds');
        setBirds(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Birds error:', err.response?.data || err.message);
        setError('Failed to load birds. Please try again.');
        setLoading(false);
      });
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
              <option key={f.id} value={f.id}>
                {f.common_family_name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="loading-msg">
            <p>🔄 Loading birds...</p>
          </div>
        )}

        {error && (
          <div className="error-msg-page">
            <p>❌ {error}</p>
          </div>
        )}

        {!loading && !error && birds.length === 0 && (
          <div className="no-results">
            <p>No birds found. Try a different search.</p>
          </div>
        )}

        {!loading && !error && birds.length > 0 && (
          <div className="birds-grid">
            {birds.map(bird => (
              <BirdCard key={bird.id} bird={bird} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EndemicBirdsPage;