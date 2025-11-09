import service_1 from '../assets/service-1.jpg'
import service_2 from '../assets/service-2.jpg'
function OurServices(){
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h3>What Do We Offer For You?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam consequuntur ea quis dolore, delectus culpa. Exercitationem commodi tempora ea quod et eligendi, minus eveniet! Accusamus nostrum at hic dolores deleniti. </p>
                    <div className="row">
                        <div className="col-lg-6">
                            <h4>Quality Products</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                        <div className="col-lg-6">
                            <h4>Custom Products</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h4>Online Order</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                        <div className="col-lg-6">
                            <h4>Home Delivery</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className='row gy-3'>
                        <div className='col-lg-6'>
                             <img src={service_1} alt="" className='img-fluid' />
                        </div>
                        <div className='col-lg-6'>
                            <img src={service_2} alt="" className='img-fluid'/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default OurServices
