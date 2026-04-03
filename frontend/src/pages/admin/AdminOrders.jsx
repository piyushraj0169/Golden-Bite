import React, { useState, useEffect } from 'react';
import { getJSON, putJSON } from '../../utils/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getJSON('/api/admin/orders');
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await putJSON(`/api/admin/orders/${id}/status`, { status: newStatus });
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Recent Orders</h5>
        <button className="btn btn-outline-primary btn-sm">Export CSV</button>
      </div>

      <div className="table-responsive">
        <table className="table admin-table table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="fw-bold text-primary">{order.order_id || order._id.substring(0,8)}</td>
                <td>{order.userId?.name || (order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'Guest')}</td>
                <td className="text-muted">{new Date(order.createdAt || order.created_at || Date.now()).toLocaleDateString()}</td>
                <td className="fw-bold">₹{((order.amount||0)/100).toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-${order.status || 'created'}`}>
                    {order.status || 'created'}
                  </span>
                </td>
                <td>
                  <select 
                    className="form-select form-select-sm" 
                    value={order.status || 'created'}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{width: 'auto'}}
                  >
                    <option value="created">Created</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="6" className="text-center py-4">No orders found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
