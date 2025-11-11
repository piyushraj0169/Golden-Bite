
import {Link} from 'react-router-dom'
function Banner({header_text,header_line})
{
    

    return(
        <div className="banner ">
            <div className="banner-text">
                <h1 className="header_text">{header_text}!</h1>
                <p className="header_text">{header_line}</p>
                <div>
                   <Link to="/ProductList" className="btn-order">Order Now</Link>
                </div>
            </div>
        </div>
    )
}
export default Banner





// "A bakery is where dreams rise and delicious memories are made"



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