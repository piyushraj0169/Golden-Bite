import { useLocation, Link } from "react-router-dom";
import { API_BASE } from "../utils/api";
import { FaCheckCircle, FaReceipt, FaCreditCard, FaRupeeSign, FaFileDownload, FaShoppingBag } from 'react-icons/fa';

export default function Success() {
  const { state } = useLocation() || {};
  const invoiceUrl = state?.invoiceUrl ? API_BASE + state.invoiceUrl : null;

  return (
    <div className="success-page py-5">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="success-card p-5 rounded shadow-lg text-center">
              {/* Animated Checkmark */}
              <div className="success-icon-wrapper mb-4">
                <FaCheckCircle size={80} className="text-success" />
              </div>

              <h2 className="text-white mb-2">Payment Successful!</h2>
              <p className="text-light mb-4">Thank you for your order. Your payment has been processed successfully.</p>

              {/* Order Details */}
              <div className="success-details text-start p-4 rounded mb-4">
                {state?.orderId && (
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary">
                    <span className="text-light d-flex align-items-center gap-2">
                      <FaReceipt className="text-gold" size={14} /> Order ID
                    </span>
                    <span className="text-white fw-bold small">#{state.orderId.slice(-12)}</span>
                  </div>
                )}

                {state?.paymentId && (
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary">
                    <span className="text-light d-flex align-items-center gap-2">
                      <FaCreditCard className="text-gold" size={14} /> Payment ID
                    </span>
                    <span className="text-white fw-bold small">{state.paymentId.slice(-12)}</span>
                  </div>
                )}

                {state?.total && (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-light d-flex align-items-center gap-2">
                      <FaRupeeSign className="text-gold" size={14} /> Total Paid
                    </span>
                    <span className="text-gold fw-bold fs-4">₹{state.total}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-3">
                {invoiceUrl && (
                  <a
                    className="btn btn-gold-solid w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
                    href={invoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFileDownload /> Download Invoice PDF
                  </a>
                )}

                <Link
                  className="btn btn-outline-light w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  to="/"
                >
                  <FaShoppingBag /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
