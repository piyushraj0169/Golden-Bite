import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { LuIndianRupee } from "react-icons/lu"
import { FaCartPlus } from "react-icons/fa"
import { FaPlusSquare } from "react-icons/fa"
import { FaSquareMinus } from "react-icons/fa6"

function ProductList(){
    const{product_list,cartItems, addToCart,removeFromCart}=useContext(StoreContext)
    
    return(
        <div className="container mt-5 ">
            <div className="row g-3">
                {
                    product_list.map((product)=>{
                        return(
                            <div className="col-lg-3" key={product._id}>
                                    <div className="card">
                                        <img src={product.image} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <p className="card-text text-danger">{product.name}</p>
                                                   
                                                   <div className="d-flex justify-content-between align-items-center">
                                                            <p className="card-text text-success m-0"> <LuIndianRupee /> {product.price}</p>

                               {
                                       !cartItems[product._id] ? (<FaCartPlus className="add-to-cart" onClick={() => addToCart(product._id)} /> ) : (
                                         <div className="d-flex align-items-center"> <FaSquareMinus className="cart-icon-minus me-2" onClick={() => removeFromCart(product._id)} />
                                         <span className="cart-counter">{cartItems[product._id]}</span>
                                         <FaPlusSquare className="cart-icon-plus ms-2" onClick={() => addToCart(product._id)} />
                                            </div>)
                                            
                                }
                                            </div>

                                            </div>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        

    )
}
export default ProductList











 






{/* <div className="card-body">
                                                    <p className="card-text text-danger">{product.name}</p>
                                                    <p className="card-text text-success"><LuIndianRupee/>{product.price}</p>
                                                   <div>
                                                    
                                                        
                                                        
                                                      {
                                                            !cartItems[product._id]?<FaCartPlus className="add-to-cart" onClick={()=>addToCart(product._id)} />:<div>
                                                                <FaSquareMinus className="cart-icon-minus" onClick={()=>removeFromCart(product._id)}/>
                                                                {<span className="cart-counter">{cartItems[product._id]}</span>}
                                                             <FaPlusSquare className="cart-icon-plus" onClick={()=>addToCart(product._id)}/>
                                                            </div>
                                                        }       
                                                                                          
                                                    
                                                    </div>
                                                </div>






// import {useContext} from "react";
// import { StoreContext } from "../context/storeContext.jsx";
// import { LuIndianRupee } from "react-icons/lu";






// function ProductList(){
//    const {pruduct_list}=useContext(StoreContext);
//    console.log(pruduct_list);
//     return (
//         <div className="container mt-5">
//             <div className="row">
//                {pruduct_list.map((product)=>(
//                 <div className="col-lg-3 mb-4 " key={product.id}>
//                     <div className="card">
//                         <img src={product.image} className="card-img-top" alt={product.name} />
//                         <div className="card-body">
//                             <h5 className="card-title">{product.name}</h5>
//                             <p className="card-text">
//                                 <LuIndianRupee />
//                                  {product.price}</p>
//                             </div>
//                             </div>
//               </div>
//                 ))}
//             </div>
            
            
            
//             </div>
//     );


// }




// export default ProductList; *\ */}