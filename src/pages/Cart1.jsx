import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { MdDelete } from "react-icons/md"
import { LuIndianRupee } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
function Cart(){
        
    const{product_list,cartItems,removeFromCart,getTotalCartAmount}=useContext(StoreContext)
    const navigate=useNavigate()
    return(
        <div className="container mt-5">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product_list.map((product)=>{
                            if(cartItems[product._id]>0){
                                return(
                                    <tr key={product._id}>
                                           <td><img src={product.image} alt="" className="image-cart" /></td>
                                           <td>{product.name}</td>
                                           <td>{product.price}</td>
                                           <td>{cartItems[product._id]}</td>
                                           <td>{product.price*cartItems[product._id]}</td>
                                           <td><MdDelete onClick={()=>removeFromCart(product._id)}className="cart-icon-delete"/></td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            {/* <div>
                <p>Cart Total Amount:<LuIndianRupee className="text-success"/> <span className="fw-bold">{getTotalCartAmount()}</span></p>
                <div className="mt-3">
                    <button className="btn btn-dark" onClick={()=>navigate('/order')}>Proceed To Chekout</button>
                </div>
            </div> */}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
        </div>
    )
}
export default Cart

