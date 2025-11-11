import { useContext, useMemo, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import useRazorpayScript from "../utils/useRazorpayScript";
import { postJSON } from "../utils/api";

export default function Checkout() {
  const ready = useRazorpayScript();
  const navigate = useNavigate();
  const { product_list, cartItems, getTotalCartAmount } = useContext(StoreContext);

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

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const amount = getTotalCartAmount();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    if (!ready) return alert("Razorpay script not loaded yet.");

    // 1) Create order on server
    const { order, key } = await postJSON("/create-order", {
      amount,
      customer: form,
      items,
      notes: { source: "goldenbite-web" }
    });

    // 2) Razorpay payment
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

      theme: { color: "#111827" },

     handler: async function (response) {
  const verify = await postJSON("/verify-payment", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
    customer: form, // full delivery details
    items: items    // ordered products
  });

  navigate("/success", { state: verify });
},

    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Delivery Information</h5>
        <div>Payment: ₹ <b>{amount}</b></div>
      </div>

      <form className="mt-3" onSubmit={handlePay}>
        <input className="form-control mb-2" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required/>
        <input className="form-control mb-2" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required/>
        <input className="form-control mb-2" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required/>
        <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
        <input className="form-control mb-2" name="address" placeholder="Full Address" value={form.address} onChange={handleChange} required/>
        <input className="form-control mb-2" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input className="form-control mb-2" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
        <input className="form-control mb-2" name="zip" placeholder="Pincode" value={form.zip} onChange={handleChange} required/>
        <input className="form-control mb-3" name="country" placeholder="Country" value={form.country} onChange={handleChange} required />

        <button className="btn btn-dark" type="submit" disabled={!ready || amount <= 0}>
          {ready ? "Proceed To Payment" : "Loading…"}
        </button>
      </form>
    </div>
  );
}
