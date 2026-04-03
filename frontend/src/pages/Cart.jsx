import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { AuthContext } from "../context/AuthContext";
import { MdDelete } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { FaPlusSquare } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    product_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/checkout");
    }
  };

  const totalAmount = getTotalCartAmount();
  const isEmpty = totalAmount === 0;

  return (
    <div className="cart-page py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 feature-section-header">
          <span className="feature-subtitle-badge mb-3 d-inline-block">Your Shopping Cart</span>
          <h2 className="feature-main-header mb-3 text-white">Review Your <span className="text-gold">Order</span></h2>
        </div>

        {isEmpty ? (
          <div className="text-center text-white my-5">
            <h4 className="mb-4">Your cart is currently empty.</h4>
            <button className="btn-gold-outline" onClick={() => navigate('/ProductList')}>Explore Menu</button>
          </div>
        ) : (
          <div className="row g-5">
            {/* Left Column: Cart Items List */}
            <div className="col-lg-8">
              <div className="cart-items-container">
                {product_list.map((product) => {
                  if (cartItems[product._id] > 0) {
                    return (
                      <div className="cart-item-card d-flex align-items-center mb-3" key={product._id}>
                        <img src={product.image} alt={product.name} className="cart-item-img me-4" />

                        <div className="cart-item-details flex-grow-1">
                          <h5 className="cart-item-title mb-1">{product.name}</h5>
                          <p className="cart-item-price mb-2 text-light">
                            <LuIndianRupee className="mb-1" /> {product.price} each
                          </p>

                          <div className="cart-counter-container d-inline-flex align-items-center">
                            <FaSquareMinus className="cart-icon-minus action-btn" onClick={() => removeFromCart(product._id)} />
                            <span className="cart-counter-text mx-3">{cartItems[product._id]}</span>
                            <FaPlusSquare className="cart-icon-plus action-btn" onClick={() => addToCart(product._id)} />
                          </div>
                        </div>

                        <div className="cart-item-total text-end me-4">
                          <p className="mb-0 text-white fw-bold fs-5">
                            <LuIndianRupee className="mb-1 text-gold" />
                            {product.price * cartItems[product._id]}
                          </p>
                        </div>

                        <div className="cart-item-remove ms-2">
                          <div className="remove-btn-wrapper" onClick={() => removeFromCart(product._id)}>
                            <MdDelete className="delete-icon" />
                          </div>
                        </div>

                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Right Column: Order Summary Side Panel */}
            <div className="col-lg-4">
              <div className="cart-summary-card p-4 sticky-top" style={{ top: '100px' }}>
                <h4 className="summary-title mb-4 border-bottom border-secondary pb-3 text-white">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3 text-light">
                  <span>Subtotal</span>
                  <span><LuIndianRupee className="mb-1" />{totalAmount}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 text-light">
                  <span>Delivery Fee</span>
                  <span className="text-success fw-bold">Free</span>
                </div>

                <hr className="border-secondary my-4" />

                <div className="d-flex justify-content-between mb-4 mt-2">
                  <span className="fs-5 text-white fw-bold">Total Amount</span>
                  <span className="fs-4 text-gold fw-bold">
                    <LuIndianRupee className="mb-1" />{totalAmount}
                  </span>
                </div>

                <button className="btn-gold-solid w-100 py-3 mt-2" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
