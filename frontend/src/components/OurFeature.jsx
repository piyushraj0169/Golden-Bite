import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaRegUser, FaCookieBite, FaBabyCarriage } from "react-icons/fa";
import { RiBreadLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";

function OurFeature() {
  return (
    <section className="features-section pb-5 mt-5">
      <div className="container">

        {/* Section Header */}
        <div className="feature-section-header text-center mb-5">
          <span className="feature-subtitle-badge mb-3 d-inline-block">Why Choose Us</span>
          <h2 className="feature-main-header mb-3">Our <span className="text-gold">Features</span></h2>
          <div className="feature-description mx-auto" style={{ maxWidth: '650px' }}>
            <p>We pride ourselves on delivering the very best experience to our customers every single day.</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="row g-4 justify-content-center">

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <VscWorkspaceTrusted className="feature-icon" />
              </div>
              <h4 className="feature-title">50+</h4>
              <p className="feature-desc">Years Experience</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <FaRegUser className="feature-icon" />
              </div>
              <h4 className="feature-title">1000+</h4>
              <p className="feature-desc">Satisfied Clients</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <RiBreadLine className="feature-icon" />
              </div>
              <h4 className="feature-title">2000+</h4>
              <p className="feature-desc">Baked Goods</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <FaRegUser className="feature-icon" />
              </div>
              <h4 className="feature-title">150+</h4>
              <p className="feature-desc">Awards Winning</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <FaBabyCarriage className="feature-icon" />
              </div>
              <h4 className="feature-title">300+</h4>
              <p className="feature-desc">Delivery Per Day</p>
            </div>
          </div>

          {/* ✅ NEW FEATURES AESTHETIC */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <FaCookieBite className="feature-icon" />
              </div>
              <h4 className="feature-title">50+</h4>
              <p className="feature-desc">Fresh Items Daily</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <HiOutlineLocationMarker className="feature-icon" />
              </div>
              <h4 className="feature-title">20+</h4>
              <p className="feature-desc">Store Locations</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="feature-card text-center">
              <div className="feature-icon-wrapper mx-auto mb-3">
                <TbTruckDelivery className="feature-icon" />
              </div>
              <h4 className="feature-title">Fast</h4>
              <p className="feature-desc">Home Delivery</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OurFeature;
