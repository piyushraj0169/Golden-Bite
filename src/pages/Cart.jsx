import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { AuthContext } from "../context/AuthContext"; // ✅ MISSING IMPORT
import { MdDelete } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    product_list,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const { user } = useContext(AuthContext); // ✅ GET USER
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // 🚨 NOT LOGGED IN → LOGIN PAGE
      navigate("/login", { state: { from: "/cart" } });
    } else {
      // ✅ LOGGED IN → CHECKOUT
      navigate("/checkout");
    }
  };

  return (
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
          {product_list.map((product) => {
            if (cartItems[product._id] > 0) {
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt=""
                      className="image-cart"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{cartItems[product._id]}</td>
                  <td>{product.price * cartItems[product._id]}</td>
                  <td>
                    <MdDelete
                      onClick={() => removeFromCart(product._id)}
                      className="cart-icon-delete"
                    />
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <p>
        <b>
          Cart Total Amount:
          <LuIndianRupee className="text-success" />
          <span className="fw-bold">{getTotalCartAmount()}</span>
        </b>
      </p>

      <div className="mt-3">
        <button
          className="btn btn-dark"
          onClick={handleCheckout} // ✅ FIXED
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
