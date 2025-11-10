import { Link } from "react-router-dom";

function CallUs() {
  return (
    <div className="call-banner mt-5">
      <div className="container">
        <div className="row align-items-center text-center text-lg-start">
          
          <div className="col-lg-6 mb-3 mb-lg-0">
            <h3 className="call-title">The Best Bakery In Your City</h3>
          </div>

          <div className="col-lg-6 text-lg-end">
            <h4 className="call-label">Call Us</h4>
            <h3 className="call-number">+91 2330169000</h3>

           
            <div className="mt-3">
              <Link to="/ProductList" className="call-btn">
                Order Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CallUs;
