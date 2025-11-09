
import {NavLink} from 'react-router-dom'
function Banner({header_text})
{
    return(
        <div className="banner">
            <div className="banner-text">
                <h1>{header_text}</h1>
                <p>"A bakery is where dreams rise and delicious memories are made"</p>
                <div>
                    <NavLink to="#" className="btn-order">Order Now</NavLink>     
                </div>
            </div>
        </div>
    )
}
export default Banner









// import { NavLink } from "react-router-dom";
// function Banner() {

  
//   return (
//     <div className="banner">
//         <div className="banner-text">
//       <h1>Welcome to Baker's Delight</h1>
//       <p>Your one-stop shop for delicious baked goods!</p>
//       <NavLink to="/services" className="btn btn-dark">ORDER NOW</NavLink>
//     </div>
    
//     </div>
//   );
// }
// export default Banner;