import React, { useState, useEffect } from 'react';
import { getJSON } from '../../utils/api';
import { FaMoneyCheckAlt, FaDownload } from 'react-icons/fa';

function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJSON('/api/admin/orders');
        // We consider orders that are 'paid' or 'completed' as successful payment transactions 
        const paidOrders = data.filter(o => ['paid', 'completed'].includes(o.status));
        setPayments(paidOrders);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0 d-flex align-items-center">
          <FaMoneyCheckAlt className="me-2 text-success" /> Payment Transactions
        </h5>
        <button className="btn btn-sm btn-outline-primary d-flex align-items-center">
          <FaDownload className="me-2"/> Export Log
        </button>
      </div>

      <div className="table-responsive">
        <table className="table admin-table align-middle">
          <thead>
            <tr>
              <th>Txn ID / Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(o => (
              <tr key={o._id}>
                <td className="text-primary fw-bold font-monospace" style={{fontSize: '0.9rem'}}>
                  {o.payment_id || o.order_id || o._id.substring(0,12)}
                </td>
                <td className="fw-bold">{o.userId?.name || (o.customer ? `${o.customer.firstName} ${o.customer.lastName}` : 'Guest')}</td>
                <td className="fw-bold text-success">₹{((o.amount||0)/100).toFixed(2)}</td>
                <td className="text-muted">{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  <span className="status-badge status-completed">Success</span>
                </td>
              </tr>
            ))}
            {payments.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No successful payments found yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPayments;
