import React from 'react';
import { FaShieldAlt, FaInfoCircle, FaCreditCard, FaUndoAlt, FaUserSecret, FaSyncAlt } from 'react-icons/fa';

function TermsAndConditions() {
  const terms = [
    {
      icon: <FaShieldAlt className="feature-icon text-white" />,
      title: "1. Use of Website",
      desc: "The content on this website is for personal use only. Any unauthorized use or misuse may result in legal action."
    },
    {
      icon: <FaInfoCircle className="feature-icon text-white" />,
      title: "2. Product Information",
      desc: "We aim to accurately display our products; however, slight variations in color and design may occur."
    },
    {
      icon: <FaCreditCard className="feature-icon text-white" />,
      title: "3. Orders & Payments",
      desc: "Orders are processed only after full payment is received. Cancellation is allowed before order processing."
    },
    {
      icon: <FaUndoAlt className="feature-icon text-white" />,
      title: "4. Refund Policy",
      desc: "Due to the perishable nature of our food products, returns or refunds are not accepted once delivered."
    },
    {
      icon: <FaUserSecret className="feature-icon text-white" />,
      title: "5. Privacy & Data",
      desc: "We respect your privacy. Your personal data is securely stored and will never be shared without consent."
    },
    {
      icon: <FaSyncAlt className="feature-icon text-white" />,
      title: "6. Updates to Policy",
      desc: "We reserve the right to update or modify these terms at any time without prior notice."
    }
  ];

  return (
    <div className="terms-page py-5" style={{ backgroundColor: '#151515', minHeight: '100vh', color: '#fff' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-4 mb-3" style={{ color: '#fff' }}>Terms & <span style={{ color: '#ffce00' }}>Conditions</span></h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#ffce00', margin: '0 auto', borderRadius: '2px' }}></div>
          <p className="lead mt-4" style={{ color: '#a8a8a8' }}>
            Please read the following terms carefully before using our services.
          </p>
        </div>

        <div className="row justify-content-center g-4 mt-4">
          {terms.map((term, index) => (
            <div key={index} className="col-lg-6 col-md-12">
              <div className="feature-card p-4 h-100 d-flex align-items-start" style={{ textAlign: 'left', background: '#1b1b1b', borderRadius: '15px' }}>
                <div className="feature-icon-wrapper me-4 flex-shrink-0" style={{ width: '60px', height: '60px', background: '#ffce00' }}>
                  {term.icon}
                </div>
                <div>
                  <h4 className="feature-title mb-2" style={{ fontSize: '1.4rem' }}>{term.title}</h4>
                  <p className="feature-desc m-0" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{term.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
