import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaStar, FaInstagram, FaTwitter, FaLinkedin, FaAward } from "react-icons/fa";

function OurTeam() {
  const { our_team } = useContext(StoreContext);

  return (
    <div className="premium-experts-section py-5" style={{ backgroundColor: '#121212' }}>
      <div className="container my-5">
        <div className="text-center mb-5">
          <span className="badge rounded-pill bg-warning text-dark px-4 py-2 mb-3 fw-bold" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>MEET OUR EXPERTS</span>
          <h2 className="text-white fw-bold display-5">The Culinary Masters of <span style={{ color: '#d4af37' }}>GoldenBite</span></h2>
          <p className="mx-auto mt-3" style={{ color: '#a0a0a0', maxWidth: '600px', fontSize: '1.1rem' }}>
            Our globally recognized chefs bring decades of Michelin-star experience, blending traditional craftsmanship with contemporary innovation.
          </p>
        </div>

        <div className="row justify-content-center g-4 mt-4">
          {our_team.map((team) => (
            <div className="col-12 col-md-6 col-lg-3" key={team._id}>
              <div className="expert-card p-4 h-100 d-flex flex-column align-items-center text-center position-relative overflow-hidden">
                
                {/* Glowing Background Effect behind Card on Hover */}
                <div className="expert-glow-bg"></div>

                <div className="expert-image-wrapper mb-4 position-relative">
                  <img src={team.image} alt={team.name} className="expert-img rounded-circle" />
                  <div className="expert-experience-badge">
                    <FaAward className="me-1 mb-1" /> {team.experience}
                  </div>
                </div>

                <h4 className="text-white fw-bold mb-1 expert-name">{team.name}</h4>
                <p className="expert-role mb-2 text-uppercase fw-semibold" style={{ color: '#d4af37', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  {team.role}
                </p>

                <div className="expert-rating mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(team.rating || 5) ? "#d4af37" : "#444"} size={14} className="mx-1" />
                  ))}
                  <span className="ms-2 small" style={{ color: '#a0a0a0' }}>({team.rating || 5.0})</span>
                </div>

                <p className="small mb-4 flex-grow-1 expert-desc" style={{ color: '#e0e0e0' }}>
                  "{team.description}"
                </p>

                <div className="expert-socials d-flex gap-3">
                  <a href="#" className="expert-social-link"><FaInstagram /></a>
                  <a href="#" className="expert-social-link"><FaTwitter /></a>
                  <a href="#" className="expert-social-link"><FaLinkedin /></a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .premium-experts-section {
          background-color: #121212;
        }
        .expert-card {
          background: #1a1a1a;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
        }
        .expert-card:hover {
          transform: translateY(-15px);
          border-color: #d4af37;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.15);
        }
        .expert-glow-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .expert-card:hover .expert-glow-bg {
          opacity: 1;
        }
        .expert-image-wrapper {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          padding: 5px;
          background: linear-gradient(135deg, #d4af37 0%, #ffdf73 100%);
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          transition: transform 0.4s ease;
        }
        .expert-card:hover .expert-image-wrapper {
          transform: scale(1.05);
        }
        .expert-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 4px solid #1a1a1a;
        }
        .expert-experience-badge {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #d4af37;
          color: #121212;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          border: 2px solid #1a1a1a;
        }
        .expert-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #222;
          color: #a0a0a0;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .expert-social-link:hover {
          background: #d4af37;
          color: #121212;
          transform: translateY(-3px);
        }
        .expert-desc {
          line-height: 1.5;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default OurTeam;
