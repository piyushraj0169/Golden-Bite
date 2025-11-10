import { FaCheckCircle } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="container my-5 py-5 about-section">
      <div className="row align-items-center">

        {/* Images Section */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="row g-3">
            <div className="col-6">
              <img src="cake21.jpg" className="about-img img-fluid" alt="Bakery" />
            </div>
            <div className="col-6">
              <img src="cupcake2.jpg" className="about-img img-fluid" alt="Bakery Display" />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="col-lg-6">
          <h2 className="about-title">What do we offer to you?</h2>
          <p className="about-text">
            At GoldenBite, we take pride in providing a wide variety of freshly baked
            goods to match your taste and needs from daily treats to celebration cakes.
          </p>

          <div className="row mt-4">
            <div className="col-6 about-feature">
              <FaCheckCircle className="about-icon" />
              <h5>Quality Products</h5>
              <p>Made with premium ingredients & strict quality standards.</p>
            </div>
            <div className="col-6 about-feature">
              <FaCheckCircle className="about-icon" />
              <h5>Custom Orders</h5>
              <p>Get cakes & pastries tailored to your special moments.</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6 about-feature">
              <FaCheckCircle className="about-icon" />
              <h5>Online Order</h5>
              <p>Order easily through our website anytime.</p>
            </div>
            <div className="col-6 about-feature">
              <FaCheckCircle className="about-icon" />
              <h5>Home Delivery</h5>
              <p>Get fresh bakery items delivered at your doorstep.</p>
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