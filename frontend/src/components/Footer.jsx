import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer-section text-light pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row gy-5">

            {/* Column 1: Brand & About */}
            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="premium-brand footer-logo mb-3">
                Golden<span className="text-gold">Bite</span>
              </h3>
              <p className="footer-desc mb-4">
                Baking happiness everyday. We bring you the finest quality cakes, pastries, and treats made with love and premium ingredients.
              </p>
              <div className="d-flex gap-3 social-icons-group">
                <a href="#" className="footer-social-icon"><FaFacebookF /></a>
                <a href="#" className="footer-social-icon"><FaTwitter /></a>
                <a href="#" className="footer-social-icon"><FaYoutube /></a>
                <a href="https://www.linkedin.com/in/piyushraj0169/" className="footer-social-icon"><FaLinkedinIn /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="footer-title">Quick Links</h5>
              <div className="footer-underline mb-4"></div>
              <ul className="footer-list">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                <li><Link to="/services" className="footer-link">Our Services</Link></li>
                <li><Link to="/termsandcondition" className="footer-link">Terms & Conditions</Link></li>
                <li><Link to="/support" className="footer-link">Support</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="footer-title">Contact Us</h5>
              <div className="footer-underline mb-4"></div>
              <ul className="footer-contact-list">
                <li>
                  <FaMapMarkerAlt className="contact-icon text-gold" />
                  <span>123 Street, Mohali, Punjab</span>
                </li>
                <li>
                  <FaPhoneAlt className="contact-icon text-gold" />
                  <span>+91 2330169000</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon text-gold" />
                  <span>goldenbite@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Gallery */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="footer-title">Newsletter</h5>
              <div className="footer-underline mb-4"></div>
              <p className="footer-text mb-3">Subscribe for updates on new cakes & exclusive offers.</p>

              <div className="newsletter-box d-flex mb-4">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter email address"
                 
                  
                  
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>

              <h5 className="footer-title mb-3 fs-6">Photo Gallery</h5>
              <div className="footer-gallery">
                <img src="/img1.jpg" alt="Cake 1" />
                <img src="/img2.jpg" alt="Cake 2" />
                <img src="/img3.jpg" alt="Cake 3" />
                <img src="/img4.jpg" alt="Cake 4" />
                <img src="/img5.jpg" alt="Cake 5" />
                <img src="/img6.jpg" alt="Cake 6" />
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* COPYRIGHT BAR */}
      <div className="footer-bottom text-center py-3">
        <div className="container">
          <p className="mb-0">© {new Date().getFullYear()} <span className="text-gold fw-bold">GoldenBite</span>. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;