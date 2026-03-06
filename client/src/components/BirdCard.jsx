import './BirdCard.css';
 
const BirdCard = ({ bird }) => {
  const statusColors = {
    LC: '#27ae60', NT: '#f39c12', VU: '#e67e22',
    EN: '#e74c3c', CR: '#8e44ad'
  };
 
  return (
    <div className="bird-card">
      <div className="bird-img-wrapper">
        <img
          src={bird.image_url || "/images/placeholder-bird.jpg"}
          alt={bird.common_name}
          className="bird-img"
          onError={e => e.target.src = "/images/placeholder-bird.jpg"}
        />
        <span
          className="status-badge"
          style={{ background: statusColors[bird.iucn_status] || "#95a5a6" }}
        >
          {bird.iucn_status || "N/A"}
        </span>
      </div>
      <div className="bird-info">
        <h3 className="bird-name">{bird.common_name}</h3>
        <p className="bird-scientific">{bird.scientific_name}</p>
        <p className="bird-family">{bird.common_family_name}</p>
        <p className="bird-desc">{bird.description?.substring(0, 100)}...</p>
      </div>
    </div>
  );
};
 
export default BirdCard;
