import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";


function Footer() {
  return (
    <>
      <footer className="footer-section text-light py-5 mt-3">
        <div className="container">
          <div className="row gy-4">

            {/* Office Address */}
            <div className="col-md-4">
              <h5 className="footer-title">Office Address</h5>
              <p className="footer-text">123 Street, New York, USA</p>
              <p className="footer-text">+012 345 67890</p>
              <p className="footer-text">info@example.com</p>

              <div className="d-flex gap-3 mt-3">
                <FaFacebookF className="footer-icon" />
                <FaTwitter className="footer-icon" />
                <FaYoutube className="footer-icon" />
                <FaLinkedinIn className="footer-icon" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-md-5">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-list">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Our Services</li>
                <li>Terms & Condition</li>
                <li>Support</li>
              </ul>
            </div>

          

           {/* Newsletter & Gallery */}
<div className="col-md-3">
  <h5 className="footer-title">Join Our Newsletter</h5>
  <p className="footer-text">Get updates on new cakes & offers</p>

  <div className="newsletter-box d-flex">
    <input
      type="email"
      className="form-control newsletter-input"
      placeholder="Enter your email"
    />
    <button className="newsletter-btn">Subscribe</button>
  </div>

  <h5 className="footer-title mt-4">Photo Gallery</h5>
  <div className="gallery ">
    <img src="/img1.jpg" alt="" />
    <img src="/img2.jpg" alt="" />
    <img src="/img3.jpg" alt="" />
    <img src="/img4.jpg" alt="" />
     <img src="/img5.jpg" alt="" />
    <img src="/img6.jpg" alt="" />
    <img src="/img7.jpg" alt="" />
    <img src="/img8.jpg" alt="" />
   

  </div>
  
</div>


          </div>
        </div>
      </footer>

      {/* COPYRIGHT BAR */}
      <div className="footer-bottom text-center py-3">
        ©{new Date().getFullYear()} GoldenBite — All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;




















// function Footer(){

//     return(
       
//           <div className=" bg-dark text-white text-center py-3 mt-3">
//             <span className="mb-3 mb-md-0  text-white">©2025 BakeryShop, Inc</span>
//           </div>
          

       
//     )
// }

// export default Footer;