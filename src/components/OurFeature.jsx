import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaRegUser, FaCookieBite, FaBabyCarriage } from "react-icons/fa";
import { RiBreadLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";

function OurFeature() {
  return (
    <div className="features-section">
      <div className="container">
        <div className="features-wrapper">

          <div className="feature-card">
            <VscWorkspaceTrusted className="feature-icon"/>
            <h4>50+</h4>
            <p>Years Experience</p>
          </div>

          <div className="feature-card">
            <FaRegUser className="feature-icon"/>
            <h4>1000+</h4>
            <p>Satisfied Clients</p>
          </div>

          <div className="feature-card">
            <RiBreadLine className="feature-icon"/>
            <h4>2000+</h4>
            <p>Baked Goods</p>
          </div>

          <div className="feature-card">
            <FaRegUser className="feature-icon"/>
            <h4>150+</h4>
            <p>Awards Winning</p>
          </div>

          <div className="feature-card">
            <FaBabyCarriage className="feature-icon"/>
            <h4>300+</h4>
            <p>Delivery Per Day</p>
          </div>

          {/* ✅ NEW FEATURES ADDED */}
          <div className="feature-card">
            <FaCookieBite className="feature-icon"/>
            <h4>50+</h4>
            <p>Fresh Items Daily</p>
          </div>

          <div className="feature-card">
            <HiOutlineLocationMarker className="feature-icon"/>
            <h4>20+</h4>
            <p>Store Locations</p>
          </div>

          <div className="feature-card">
            <TbTruckDelivery className="feature-icon"/>
            <h4>Fast</h4>
            <p>Home Delivery</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OurFeature;
