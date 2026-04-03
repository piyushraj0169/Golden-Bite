import { useContext, useMemo, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useRazorpayScript from "../utils/useRazorpayScript";
import { postJSON } from "../utils/api";
import { FaTruck, FaCreditCard, FaShoppingBag, FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function Checkout() {
  const ready = useRazorpayScript();
  const navigate = useNavigate();
  const { product_list, cartItems, getTotalCartAmount } = useContext(StoreContext);
  const { user } = useContext(AuthContext);

  const items = useMemo(() => (
    product_list
      .filter(p => cartItems[p._id] > 0)
      .map(p => ({
        id: p._id,
        title: p.name,
        price: Number(p.price),
        qty: cartItems[p._id],
        image: p.image
      }))
  ), [product_list, cartItems]);

  // Pre-fill from user profile
  const nameParts = (user?.name || "").split(" ");
  const [form, setForm] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });

  const amount = getTotalCartAmount();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    if (!ready) return alert("Razorpay script not loaded yet.");

    try {
      const { order, key } = await postJSON("/create-order", {
        amount,
        customer: form,
        items,
        notes: { source: "goldenbite-web" }
      });

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "GoldenBite",
        description: "Order Payment",
        image: "/logo.png",
        order_id: order.id,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          "Delivery Address": `${form.address}, ${form.city}, ${form.state} - ${form.zip}, ${form.country}`,
          "Customer Name": `${form.firstName} ${form.lastName}`,
        },
        theme: { color: "#ffce00" },
        handler: async function (response) {
          try {
            const verify = await postJSON("/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer: form,
              items: items
            });
            navigate("/success", { state: verify });
          } catch (err) {
            alert("Payment verification failed: " + err.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Failed to create order: " + err.message);
    }

  };

  if (amount === 0) {
    return (
      <div className="checkout-page py-5">
        <div className="container text-center py-5">
          <h2 className="text-white mb-4">Your cart is empty!</h2>
          <button className="btn btn-gold-solid px-4 py-2" onClick={() => navigate('/products')}>Explore Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page py-5">
      <div className="container my-5">
        <div className="text-center mb-5 feature-section-header">
          <span className="feature-subtitle-badge mb-3 d-inline-block">Secure Checkout</span>
          <h2 className="feature-main-header text-white">Complete Your <span className="text-gold">Order</span></h2>
        </div>

        <form onSubmit={handlePay}>
          <div className="row g-5">
            {/* Left Column: Delivery Form */}
            <div className="col-lg-8">
              <div className="checkout-form-card p-4 p-md-5 rounded shadow-lg">
                <h4 className="text-white mb-4 d-flex align-items-center gap-2">
                  <FaTruck className="text-gold" /> Delivery Information
                </h4>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaUser size={12} /> FIRST NAME
                      </label>
                      <input className="form-control premium-input" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaUser size={12} /> LAST NAME
                      </label>
                      <input className="form-control premium-input" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaPhoneAlt size={12} /> PHONE NUMBER
                      </label>
                      <input className="form-control premium-input" name="phone" placeholder="+91 9876543210" value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaEnvelope size={12} /> EMAIL ADDRESS
                      </label>
                      <input className="form-control premium-input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={12} /> FULL ADDRESS
                      </label>
                      <input className="form-control premium-input" name="address" placeholder="123 Street Name, Area" value={form.address} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={12} /> CITY
                      </label>
                      <input className="form-control premium-input" name="city" placeholder="Sahibzada Ajit Singh Nagar" value={form.city} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={12} /> STATE
                      </label>
                      <input className="form-control premium-input" name="state" placeholder="Punjab" value={form.state} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={12} /> PINCODE
                      </label>
                      <input className="form-control premium-input" name="zip" placeholder="140603" value={form.zip} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="custom-input-group">
                      <label className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaGlobe size={12} /> COUNTRY
                      </label>
                      <input className="form-control premium-input" name="country" placeholder="India" value={form.country} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="col-lg-4">
              <div className="order-summary-card p-4 rounded shadow-lg sticky-top" style={{ top: '100px' }}>
                <h4 className="text-white mb-4 d-flex align-items-center gap-2">
                  <FaShoppingBag className="text-gold" /> Order Summary
                </h4>

                <div className="summary-items mb-4 border-bottom border-secondary pb-3">
                  {items.map((it) => (
                    <div key={it.id} className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-light small">{it.title} x {it.qty}</span>
                      <span className="text-white small fw-bold">₹{it.price * it.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-totals mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-light">Subtotal</span>
                    <span className="text-white fw-bold">₹{amount}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-light">Delivery Fee</span>
                    <span className="text-success fw-bold">FREE</span>
                  </div>
                  <hr className="border-secondary" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-white mb-0">Total</h5>
                    <h5 className="text-gold mb-0">₹{amount}</h5>
                  </div>
                </div>

                <button
                  className="btn btn-gold-solid w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  type="submit"
                  disabled={!ready || amount <= 0}
                >
                  <FaCreditCard /> {ready ? "PROCEED TO PAYMENT" : "LOADING..."}
                </button>

                <p className="text-center text-light x-small mt-3 mb-0">
                  Secure encrypted checkout powered by Razorpay.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
