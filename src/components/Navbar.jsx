import {NavLink, useNavigate} from 'react-router-dom'
function Navbar(){
 const navigate=useNavigate()
    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
                  <div className="container-fluid">
                 <NavLink className="navbar-brand" to="/"><span className="golden">Golden</span><span>Bite</span></NavLink>
                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                 </button>
         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/productlist">Products</NavLink>
              <NavLink className="nav-link" to="/services">Services</NavLink>
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
          </div>
             <button onClick={()=>navigate("/cart")} className='btn btn-primary'>Cart</button>
       </div>
       </div>
        </nav>
   </div>
    )
}
export default Navbar





















// import { NavLink } from "react-router-dom";


// function Navbar(){
//     return (
//         <div>
//            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
//               <div className="container-fluid">
//               <NavLink className="navbar-brand" href="/"><span className="text-primary b1">Bakery</span><span>Shop</span></NavLink>
//                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                <span className="navbar-toggler-icon"></span>
//                  </button>
//               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                <div className="navbar-nav ms-auto">
//                 <NavLink className="nav-link" to="/">Home</NavLink>
//                <NavLink className="nav-link" to="/services">Services</NavLink>
//                <NavLink className="nav-link" to="/products">Products</NavLink>

//                 <NavLink className="nav-link" to="/contact">Contact</NavLink>
//                 <NavLink className="nav-link" to="/about">About</NavLink>
       
//               </div>
//               <button onClick={()=>navigate("/cart")} className='btn btn-primary'>Cart</button>
//     </div>
//   </div>
// </nav>
//         </div>
//     );  

// }
// export default Navbar;