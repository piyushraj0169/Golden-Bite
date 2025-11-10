function TermsAndConditions() {
  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Terms & Conditions</h2>
        <div className="underline mx-auto"></div>
      </div>

      <p className="lead text-muted text-center mb-5">
        Please read the following terms carefully before using our services.
      </p>

      <div className="terms-box p-4 rounded shadow-sm">
        <h5 className="section-heading">1. Use of Website</h5>
        <p>The content on this website is for personal use only. Any misuse may result in legal action.</p>

        <h5 className="section-heading">2. Product Information</h5>
        <p>We aim to accurately display our products; however, slight variations may occur.</p>

        <h5 className="section-heading">3. Orders & Payments</h5>
        <p>Orders are processed only after full payment is received. Cancellation is allowed before processing.</p>

        <h5 className="section-heading">4. Refund Policy</h5>
        <p>Due to the perishable nature of food products, returns are not accepted once delivered.</p>

        <h5 className="section-heading">5. Privacy & Data</h5>
        <p>We respect your privacy. Your personal data will never be shared without consent.</p>

        <h5 className="section-heading">6. Updates to Policy</h5>
        <p>We reserve the right to update these terms at any time.</p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
