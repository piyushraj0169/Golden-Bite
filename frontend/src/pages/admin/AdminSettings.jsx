import React from 'react';
import { FaCog, FaSave, FaBell, FaShieldAlt } from 'react-icons/fa';

function AdminSettings() {
  const saveAction = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="admin-card">
          <h5 className="fw-bold mb-4 d-flex align-items-center"><FaCog className="me-2 text-primary" /> Store Configuration</h5>
          
          <form onSubmit={saveAction}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-muted">Store Name</label>
                <input type="text" className="form-control" defaultValue="Golden Bite HQ" />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Support Email</label>
                <input type="email" className="form-control" defaultValue="support@goldenbite.com" />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted">Contact Phone</label>
                <input type="text" className="form-control" defaultValue="+91 9876543210" />
              </div>
              
              <div className="col-12 mt-4 pt-3 border-top">
                <h6 className="fw-bold mb-3 d-flex align-items-center"><FaBell className="me-2 text-warning"/> System Preferences</h6>
                <div className="form-check form-switch mb-2">
                  <input className="form-check-input cursor-pointer" type="checkbox" defaultChecked />
                  <label className="form-check-label ms-2">Accepting New Orders</label>
                </div>
                <div className="form-check form-switch mb-2">
                  <input className="form-check-input cursor-pointer" type="checkbox" defaultChecked />
                  <label className="form-check-label ms-2">Email Notifications for Admin</label>
                </div>
              </div>

              <div className="col-12 mt-4 pt-4 border-top">
                <button type="submit" className="btn btn-primary px-4 py-2" style={{backgroundColor: '#4318FF', border: 'none'}}>
                  <FaSave className="me-2" /> Save Configuration
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="admin-card bg-light border-0">
          <h6 className="fw-bold d-flex align-items-center"><FaShieldAlt className="me-2 text-danger"/> Security Notice</h6>
          <p className="text-muted small mt-2">
            Your admin session is monitored and managed securely via JWT auth. To change your personal password, use the account dashboard rather than store settings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
