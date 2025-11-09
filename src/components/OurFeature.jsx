import { VscWorkspaceTrusted } from "react-icons/vsc"
import { FaRegUser } from "react-icons/fa"
import { RiBreadLine } from "react-icons/ri"
import { FaBabyCarriage } from 'react-icons/fa';

function OurFeature(){
    return (
        <div className="container at-5">
            <div className="row">
                <div className="col-lg-3">
                    <div className="card-feature">
                    <VscWorkspaceTrusted className="icon-features"/>
                    <h6>50+</h6>
                    <p>Years Experiance</p>
                    </div>
                 </div>
                 <div className="col-lg-3">
                
                    <div className="card-feature">
                    <FaRegUser className="icon-features"/>
                    <h6>1000+</h6>
                    <p>Satisfied Clients</p>
                    </div>
                 </div>
                 <div className="col-lg-3">
                
                    <div className="card-feature">
                    <RiBreadLine className="icon-features"/>
                    <h6>2000+</h6>
                    <p>Baked Goods</p>
                    </div>
                </div>
                 <div className="col-lg-3">
                
                    <div className="card-feature">
                        <FaRegUser className="icon-features"/>
                        <h6>150+</h6>
                        <p>Awards Winning</p>
                    </div>

                 </div>
                    <div className="col-lg-3">
                    <div className="card-feature">
                    <FaBabyCarriage className="icon-features"/>
                    <h6>300+</h6>
                    <p>Delivery Per Day</p>
                    </div>

                </div>
            </div>

            
            
            
        </div>
    )
}
export default OurFeature;