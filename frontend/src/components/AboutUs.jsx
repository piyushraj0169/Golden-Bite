import { FaCheckCircle } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="about-us-section py-5">
      <div className="container my-5">
        <div className="row align-items-center g-5">

          {/* Images Section (Left Column) - Overlapping Layout */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about-image-wrapper position-relative">
              <img 
                src="cake21.jpg" 
                className="about-img-main img-fluid shadow-lg rounded" 
                alt="Beautiful Bakery Cake" 
              />
              <img 
                src="cupcake2.jpg" 
                className="about-img-secondary img-fluid shadow-lg rounded" 
                alt="Delicious Cupcakes Display" 
              />
              {/* <div className="about-experience-badge">
                 <h3 className="mb-0 text-gold fw-bold">50+</h3>
                 <p className="mb-0 text-white small">Years Experience</p>
              </div> */}
            </div>
          </div>

          {/* Text & Features Section (Right Column) */}
          <div className="col-lg-6">
            <div className="about-text-content ps-lg-4">
              <span className="feature-subtitle-badge mb-3 d-inline-block">Discover GoldenBite</span>
              <h2 className="feature-main-header text-white mb-4">What do we <span className="text-gold">offer to you?</span></h2>
              <p className="about-text mb-5 text-light fs-5">
                At GoldenBite, we take immense pride in providing a wide variety of freshly baked
                goods to match your taste and needs. From daily morning treats to personalized celebration cakes, we bake with passion.
              </p>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="about-feature-item p-4 rounded h-100">
                    <FaCheckCircle className="about-icon mb-3" />
                    <h5 className="text-white fw-bold">Quality Products</h5>
                    <p className="text-light mb-0 small">Made with premium ingredients & strict quality standards.</p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="about-feature-item p-4 rounded h-100">
                    <FaCheckCircle className="about-icon mb-3" />
                    <h5 className="text-white fw-bold">Custom Orders</h5>
                    <p className="text-light mb-0 small">Get bespoke cakes tailored to your special moments.</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="about-feature-item p-4 rounded h-100">
                    <FaCheckCircle className="about-icon mb-3" />
                    <h5 className="text-white fw-bold">Online Order</h5>
                    <p className="text-light mb-0 small">Order effortlessly through our website anytime, anywhere.</p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="about-feature-item p-4 rounded h-100">
                    <FaCheckCircle className="about-icon mb-3" />
                    <h5 className="text-white fw-bold">Home Delivery</h5>
                    <p className="text-light mb-0 small">Get fresh bakery items delivered right to your doorstep.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;






















// function AboutUs(){
//     return(
//        <div className="container mt-5">
//         <div className="row">
//         <div  className="col-lg-6">

//            <div className="row">
//                  <div className="row gy-3">
//                             <div className="col-lg-4">
//                                 <img src="bakery.jpg" className="img-fluid" />

//                             </div>
//                             <div className="col-lg-4">
//                                 <img src="bakery1.jpg" className="img-fluid" />

//                             </div>


//                   </div>
//              </div>
//                 <div className="col-lg-6">
//                     <h3>What do we offet got you?</h3>
//                     <p>At BakeryShop, we pride ourselves on offering a wide range of bakery services to cater to your needs. Whether you're looking for delicious cakes, pastries, or custom orders, we've got you covered.</p>
//                   <div className="row">
//                         <div className="col-lg-6">
//                             <h4>Quality Products</h4>
//                             <p>We ensure that all our bakery products are made with the finest ingredients and adhere to strict quality standards.</p>
//                           </div>
//                           <div className="col-lg-6">
//                             <h4>Custom Orders</h4>
//                             <p>We offer custom cake designs and personalized bakery items to make your special occasions even more memorable.</p>
//                         </div>
//                     </div>
//                      <div className="row">
//                         <div className="col-lg-6">
//                             <h4>Online Order</h4>
//                             <p>We offer custom cake designs and personalized bakery items to make your special occasions even more memorable.</p>
//                           </div>
//                           <div className="col-lg-6">
//                             <h4>Home Delivery</h4>
//                             <p>We offer custom cake designs and personalized bakery items to make your special occasions even more memorable.</p>
//                         </div>
                        
//                     </div>
                   
                       

                    

    
//                 </div>

                
//             </div>
           
//         </div>
//            </div>
//     )
// }

// export default AboutUs;