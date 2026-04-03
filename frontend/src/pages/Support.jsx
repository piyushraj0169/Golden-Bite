import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaBirthdayCake, FaComments } from 'react-icons/fa';

function Support() {
  return (
    <div className="support-page py-5" style={{ backgroundColor: '#151515', minHeight: '100vh', color: '#fff' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-4 mb-3" style={{ color: '#fff' }}>Need <span style={{ color: '#ffce00' }}>Help</span> or Assistance?</h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#ffce00', margin: '0 auto', borderRadius: '2px' }}></div>
          <p className="lead mt-4" style={{ color: '#a8a8a8' }}>
            Our support team is always ready to help you. Choose your support type below.
          </p>
        </div>

        <div className="row justify-content-center g-4 text-center mt-4">
          {/* Order Support Card */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-card h-100 d-flex flex-column align-items-center justify-content-center p-4">
              <div className="feature-icon-wrapper mb-4">
                <FaBoxOpen className="feature-icon" />
              </div>
              <h4 className="feature-title mb-3">Order Support</h4>
              <p className="feature-desc mb-4">Track, modify, or get help with your recent orders.</p>
              <Link to="/contact" className="btn-gold-solid px-4 py-2 mt-auto text-decoration-none">Contact Support</Link>
            </div>
          </div>

          {/* Custom Cake Requests Card */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-card h-100 d-flex flex-column align-items-center justify-content-center p-4">
              <div className="feature-icon-wrapper mb-4">
                <FaBirthdayCake className="feature-icon" />
              </div>
              <h4 className="feature-title mb-3">Custom Cake</h4>
              <p className="feature-desc mb-4">Looking for something unique? Share your design idea.</p>
              <Link to="/contact" className="btn-gold-solid px-4 py-2 mt-auto text-decoration-none">Request Custom</Link>
            </div>
          </div>

          {/* General Inquiry Card */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-card h-100 d-flex flex-column align-items-center justify-content-center p-4">
              <div className="feature-icon-wrapper mb-4">
                <FaComments className="feature-icon" />
              </div>
              <h4 className="feature-title mb-3">General Inquiry</h4>
              <p className="feature-desc mb-4">Have a question? We’re here to answer.</p>
              <Link to="/contact" className="btn-gold-solid px-4 py-2 mt-auto text-decoration-none">Ask Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
