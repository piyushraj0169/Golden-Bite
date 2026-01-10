import { useLocation, Link } from "react-router-dom";
import { API_BASE } from "../utils/api";

export default function Success() {
  const { state } = useLocation() || {};
  const invoiceUrl = state?.invoiceUrl ? API_BASE + state.invoiceUrl : null;

  return (
    <div className="container text-center mt-5">
      <h3>Payment Successful 🎉</h3>
      {state?.orderId && <p>Order ID: <b>{state.orderId}</b></p>}
      {state?.paymentId && <p>Payment ID: <b>{state.paymentId}</b></p>}
      {state?.total && <p>Total Paid: ₹ <b>{state.total}</b></p>}
      {invoiceUrl && (
        <p className="mt-3">
          <a className="btn btn-outline-dark" href={invoiceUrl} target="_blank" rel="noreferrer">
            Download Invoice PDF
          </a>
        </p>
      )}
      <p className="mt-4"><Link className="btn btn-secondary" to="/">Continue Shopping</Link></p>
    </div>
  );
}
