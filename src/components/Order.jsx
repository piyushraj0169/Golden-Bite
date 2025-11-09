// import { useContext } from "react"
// import { LuIndianRupee } from "react-icons/lu"
// import { StoreContext } from "../context/StoreContext"
// function Order(){
//     const{getTotalCartAmount}=useContext(StoreContext)
//     return(
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-lg-6">
//                     <p className="my-2 fw-bold">
//                         Delivery Information
//                     </p>
//                     <form>
//                         <div className="my-3">
//                             <input type="text" placeholder="First Name" className="form-control" />
//                         </div>
//                         <div className="my-3">
//                             <input type="text" placeholder="Last Name" className="form-control" />
//                         </div>
//                         <div className="my-3">
//                             <input type="text" placeholder="Phone" className="form-control" />
//                         </div>
//                         <div className="my-3">
//                             <input type="text" placeholder="Email" className="form-control" />
//                         </div> 
//                          <div className="my-3">
//                             <input type="text" placeholder="City" className="form-control" />
//                         </div> 
//                             <div className="my-3">
//                             <input type="text" placeholder="State" className="form-control" />
//                         </div> 
//                             <div className="my-3">
//                             <input type="text" placeholder="Zip Code" className="form-control" />
//                         </div> 
//                             <div className="my-3">
//                             <input type="text" placeholder="Country" className="form-control" />
//                         </div> 
                             
//                     </form>
//                 </div>
//                 <div className="col-lg-6">
//                     <div className="mt-5">
//                         <p>Payment:<LuIndianRupee className="text-success"/> <span className="fw-bold">{getTotalCartAmount()}</span></p>
//                     </div>
//                     <div className="mt-3">
//                     <button className="btn btn-dark">Proceed To Payment</button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Order
