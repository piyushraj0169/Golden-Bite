import service_1 from '../assets/service-1.jpg'
import service_2 from '../assets/service-2.jpg'
import service_3 from '../assets/service-3.jpg'
import { FaStar, FaBirthdayCake, FaLaptop, FaTruck } from "react-icons/fa";

function OurServices() {
    return (
        <div className="services-section py-5">
            <div className="container mt-5 mb-5">
                <div className="row align-items-center g-5">

                    <div className="col-lg-6">
                        <div className="services-text-content pe-lg-4">
                            <span className="feature-subtitle-badge mb-3 d-inline-block">Our Offerings</span>
                            <h2 className="feature-main-header text-white mb-4">What Do We <span className="text-gold">Offer For You?</span></h2>
                            <p className="about-text mb-5 text-light fs-5">
                                We bake with love and deliver with care. From fresh pastries to customized cakes,
                                our bakery is committed to providing delicious and high-quality products that
                                brighten your day. Whether you visit us in store or order online, your satisfaction
                                is always our top priority.
                            </p>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="about-feature-item p-4 rounded h-100">
                                        <FaStar className="about-icon mb-3 text-gold" />
                                        <h5 className="text-white fw-bold">Quality Products</h5>
                                        <p className="text-light mb-0 small">
                                            Every item is prepared using premium ingredients for the best taste & freshness.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-feature-item p-4 rounded h-100">
                                        <FaBirthdayCake className="about-icon mb-3 text-gold" />
                                        <h5 className="text-white fw-bold">Custom Products</h5>
                                        <p className="text-light mb-0 small">
                                            Personalized cakes and bakery items designed perfectly for your special moments.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-feature-item p-4 rounded h-100">
                                        <FaLaptop className="about-icon mb-3 text-gold" />
                                        <h5 className="text-white fw-bold">Online Order</h5>
                                        <p className="text-light mb-0 small">
                                            Order your favorite treats easily from home with just a few clicks.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="about-feature-item p-4 rounded h-100">
                                        <FaTruck className="about-icon mb-3 text-gold" />
                                        <h5 className="text-white fw-bold">Home Delivery</h5>
                                        <p className="text-light mb-0 small">
                                            Enjoy our freshly baked goods delivered right to your doorstep.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mt-5 mt-lg-0">
                        <div className='service-collage position-relative w-100 h-100 d-flex justify-content-center align-items-center'>
                            <img src={service_1} alt="Bakery Display" className='collage-img collage-img-1 rounded shadow-lg' />
                            <img src={service_2} alt="Fresh Baked Items" className='collage-img collage-img-2 rounded shadow-lg' />
                            <img src={service_3} alt="Artisan Bread" className='collage-img collage-img-3 rounded shadow-lg' />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OurServices
