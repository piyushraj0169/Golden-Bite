function Support() {
  return (
    <div className="container mt-5 mb-5">

      <div className="text-center mb-4">
        <h2 className="fw-bold">Need Help or Assistance?</h2>
        <div className="underline mx-auto"></div>
      </div>

      <p className="lead text-muted text-center mb-5">
        Our support team is always ready to help you. Choose your support type below.
      </p>

      <div className="row text-center g-4">
        <div className="col-md-4">
          <div className="support-card p-4 shadow-sm rounded">
            <h5 className="fw-bold mb-3">Order Support</h5>
            <p>Track, modify, or get help with your recent orders.</p>
            <a href="/contact" className="theme-btn">Contact Support</a>
          </div>
        </div>

        <div className="col-md-4">
          <div className="support-card p-4 shadow-sm rounded">
            <h5 className="fw-bold mb-3">Custom Cake Requests</h5>
            <p>Looking for something unique? Share your design idea.</p>
            <a href="/contact" className="theme-btn">Request Custom Cake</a>
          </div>
        </div>

        <div className="col-md-4">
          <div className="support-card p-4 shadow-sm rounded">
            <h5 className="fw-bold mb-3">General Inquiry</h5>
            <p>Have a question? We’re here to answer.</p>
            <a href="/contact" className="theme-btn">Ask Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
