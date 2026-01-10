import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJSON } from "../utils/api";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJSON("/my-orders")
      .then((data) => setOrders(data.reverse()))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>

      <div className="mb-3">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <hr />

      <h4>My Orders</h4>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading && orders.length > 0 && (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>
                  {new Date(o.created_at * 1000).toLocaleString()}
                </td>
                <td>₹ {o.amount / 100}</td>
                <td>
                  <span className="badge bg-success">
                    {o.status}
                  </span>
                </td>
                <td>
                  <a
                    href={`http://localhost:3000/invoices/${o.order_id}.pdf`}
                    target="_blank"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
