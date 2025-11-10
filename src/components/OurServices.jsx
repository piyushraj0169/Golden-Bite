import service_1 from '../assets/service-1.jpg'
import service_2 from '../assets/service-2.jpg'
import service_3 from '../assets/service-3.jpg'

function OurServices(){
    return(
        <div className="container mt-5">
            <div className="row">
                
                <div className="col-lg-6">
                    <h3>What Do We Offer For You?</h3>
                    <p>
                        We bake with love and deliver with care. From fresh pastries to customized cakes, 
                        our bakery is committed to providing delicious and high-quality products that
                        brighten your day. Whether you visit us in store or order online, your satisfaction 
                        is always our top priority.
                    </p>

                    <div className="row mt-4">
                        <div className="col-lg-6">
                            <h4>Quality Products</h4>
                            <p>
                                Every item is prepared using premium ingredients for the best taste & freshness.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <h4>Custom Products</h4>
                            <p>
                                Personalized cakes and bakery items designed perfectly for your special moments.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <h4>Online Order</h4>
                            <p>
                                Order your favorite treats easily from home with just a few clicks.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <h4>Home Delivery</h4>
                            <p>
                                Enjoy our freshly baked goods delivered right to your doorstep.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className='row gy-3'>
                        <div className='col-lg-4 col-4'>
                             <img src={service_1} alt="Bakery Display" className='about-img img-fluid' />
                        </div>
                        <div className='col-lg-4 col-4'>
                            <img src={service_2} alt="Fresh Baked Items" className='about-img img-fluid'/>
                        </div>
                        <div className='col-lg-4 col-4'>
                            <img src={service_3} alt="Artisan Bread" className='about-img img-fluid'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OurServices
