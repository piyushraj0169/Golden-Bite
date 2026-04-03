import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJSON, putJSON, API_BASE } from "../utils/api";
import { io } from "socket.io-client";
import { FaUserCircle, FaEnvelope, FaSignOutAlt, FaHistory, FaFileDownload, FaBoxOpen, FaCalendarAlt, FaRupeeSign, FaPhoneAlt, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaMapSigns } from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Profile editing state
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });

  useEffect(() => {
    getJSON("/my-orders")
      .then((data) => setOrders(data.reverse()))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    const socket = io(API_BASE);
    socket.on('order_status_change', (update) => {
      setOrders(currentOrders => 
        currentOrders.map(o => 
          (o.order_id === update.order_id || String(o._id) === String(update.order_id)) 
            ? { ...o, status: update.status } 
            : o
        )
      );
      setTrackingOrder(curr => curr && (curr.order_id === update.order_id || String(curr._id) === String(update.order_id)) ? { ...curr, status: update.status } : curr);
    });

    return () => socket.disconnect();
  }, []);

  const handleProfileChange = (e) => setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { user: updated } = await putJSON("/profile", profileForm);
      updateUser(updated);
      setEditing(false);
    } catch (err) {
      alert("Failed to save profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zip: user?.zip || "",
      country: user?.country || "",
    });
    setEditing(false);
  };

  const getStepIndex = (status) => {
    const s = String(status).toLowerCase();
    if (s === 'created' || s === 'paid' || s === 'pending') return 1;
    if (s === 'preparing') return 2;
    if (s === 'out for delivery') return 3;
    if (s === 'completed') return 4;
    return 0; // cancelled
  };

  const renderTrackerModal = () => {
    if (!trackingOrder) return null;
    const step = getStepIndex(trackingOrder.status);
    const isCancelled = ['cancelled', 'failed'].includes(String(trackingOrder.status).toLowerCase());

    return (
      <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050, backdropFilter: 'blur(5px)'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-white shadow-lg border-0" style={{background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)', borderRadius: '15px'}}>
            <div className="modal-header border-bottom border-dark py-3">
              <h5 className="modal-title fw-bold text-gold d-flex align-items-center gap-2">
                <FaMapSigns /> Live Order Tracker
              </h5>
              <button type="button" className="btn-close btn-close-white opacity-75" onClick={() => setTrackingOrder(null)}></button>
            </div>
            <div className="modal-body p-4 pt-5 pb-5">
              <p className="text-center text-secondary small mb-4 fw-bold" style={{letterSpacing: '1px'}}>ORDER #{String(trackingOrder.order_id || trackingOrder._id).slice(-8).toUpperCase()}</p>
              
              {isCancelled ? (
                <div className="text-center text-danger pb-2">
                  <FaTimes size={50} className="mb-3 opacity-75" />
                  <h4 className="fw-bold">Order Cancelled</h4>
                  <p className="text-muted small">This order was cancelled and cannot be tracked.</p>
                </div>
              ) : (
                <div className="position-relative">
                  {/* Progress Line Wrapper */}
                  <div className="position-absolute" style={{top: '18px', left: '12%', width: '76%', height: '4px', zIndex: 0}}>
                    {/* Background */}
                    <div style={{width: '100%', height: '100%', backgroundColor: '#333', borderRadius: '2px'}}></div>
                    {/* Active Fill */}
                    <div className="position-absolute top-0 start-0" style={{width: `${(step-1)*33.33}%`, height: '100%', backgroundColor: '#d4af37', transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '2px', boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'}}></div>
                  </div>
                  
                  <div className="d-flex justify-content-between position-relative" style={{zIndex: 2}}>
                    {/* Step 1 */}
                    <div className="d-flex flex-column align-items-center text-center" style={{width: '70px'}}>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center mb-2 fw-bold ${step >= 1 ? 'bg-gold text-dark' : 'bg-dark text-muted border border-secondary'}`} style={{width: '40px', height: '40px', boxShadow: step === 1 ? '0 0 20px rgba(212, 175, 55, 0.8)' : 'none', transition: 'all 0.5s ease', transform: step === 1 ? 'scale(1.1)' : 'scale(1)'}}>
                        1
                      </div>
                      <span className={`small fw-bold ${step >= 1 ? 'text-white' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>Placed</span>
                    </div>
                    {/* Step 2 */}
                    <div className="d-flex flex-column align-items-center text-center" style={{width: '70px'}}>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center mb-2 fw-bold ${step >= 2 ? 'bg-gold text-dark' : 'bg-dark text-muted border border-secondary'}`} style={{width: '40px', height: '40px', boxShadow: step === 2 ? '0 0 20px rgba(212, 175, 55, 0.8)' : 'none', transition: 'all 0.5s ease', transform: step === 2 ? 'scale(1.1)' : 'scale(1)'}}>
                        2
                      </div>
                      <span className={`small fw-bold ${step >= 2 ? 'text-white' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>Preparing</span>
                    </div>
                    {/* Step 3 */}
                    <div className="d-flex flex-column align-items-center text-center" style={{width: '70px'}}>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center mb-2 fw-bold ${step >= 3 ? 'bg-gold text-dark' : 'bg-dark text-muted border border-secondary'}`} style={{width: '40px', height: '40px', boxShadow: step === 3 ? '0 0 20px rgba(212, 175, 55, 0.8)' : 'none', transition: 'all 0.5s ease', transform: step === 3 ? 'scale(1.1)' : 'scale(1)'}}>
                        3
                      </div>
                      <span className={`small fw-bold ${step >= 3 ? 'text-white' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>Delivery</span>
                    </div>
                    {/* Step 4 */}
                    <div className="d-flex flex-column align-items-center text-center" style={{width: '70px'}}>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center mb-2 fw-bold ${step >= 4 ? 'bg-success text-white' : 'bg-dark text-muted border border-secondary'}`} style={{width: '40px', height: '40px', boxShadow: step === 4 ? '0 0 25px rgba(40, 167, 69, 0.8)' : 'none', transition: 'all 0.5s ease', border: step >= 4 ? 'none' : ''}}>
                        ✓
                      </div>
                      <span className={`small fw-bold ${step >= 4 ? 'text-success' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>Done</span>
                    </div>
                  </div>

                  <div className="mt-5 text-center px-2">
                    <h5 className="text-gold fw-bold mb-3" style={{letterSpacing: '0.5px'}}>
                        {step === 1 ? "Order Received!" : 
                         step === 2 ? "We're cooking it up!" : 
                         step === 3 ? "Your food is on the way!" : "Order Delivered!"}
                    </h5>
                    <p className="text-light opacity-75 small m-0 lh-lg" style={{padding: '0 15px'}}>
                        {step === 1 ? "We have secured your payment. The kitchen is currently reviewing your order items." : 
                         step === 2 ? "Your food is currently being prepared and safely packed with extreme care." : 
                         step === 3 ? "Our delivery partner has picked up your order and is heading straight to you." : "Enjoy your meal! Thank you for choosing GoldenBite."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-page py-5">
      <div className="container my-5">
        <div className="text-center mb-5 feature-section-header">
          <span className="feature-subtitle-badge mb-3 d-inline-block">User Panel</span>
          <h2 className="feature-main-header text-white">Your <span className="text-gold">Dashboard</span></h2>
        </div>

        <div className="row g-4">
          {/* Left Column: User Profile Card */}
          <div className="col-lg-4">
            <div className="profile-card p-4 rounded shadow-lg text-center h-100">
              <div className="profile-icon-wrapper mb-3">
                <FaUserCircle size={80} className="text-gold" />
              </div>

              {!editing ? (
                <>
                  <h4 className="text-white mb-1">{user.name}</h4>
                  <p className="text-gold small d-flex align-items-center justify-content-center gap-2 mb-2">
                    <FaEnvelope size={12} /> {user.email}
                  </p>
                  {user.phone && (
                    <p className="text-light small d-flex align-items-center justify-content-center gap-2 mb-3">
                      <FaPhoneAlt size={12} /> {user.phone}
                    </p>
                  )}

                  {/* Address Display */}
                  {(user.address || user.city || user.state) ? (
                    <div className="profile-address-box text-start p-3 mb-3 rounded">
                      <h6 className="text-gold small fw-bold mb-2 d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={12} /> DELIVERY ADDRESS
                      </h6>
                      <p className="text-light small mb-0">
                        {user.address && <>{user.address}<br /></>}
                        {user.city && <>{user.city}, </>}
                        {user.state && <>{user.state}</>}
                        {user.zip && <> - {user.zip}</>}
                        {user.country && <><br />{user.country}</>}
                      </p>
                    </div>
                  ) : (
                    <div className="profile-address-box text-center p-3 mb-3 rounded">
                      <p className="text-secondary small mb-0">
                        <FaMapMarkerAlt size={12} className="me-1" />
                        No address saved yet. Add one to speed up checkout!
                      </p>
                    </div>
                  )}

                  <div className="profile-stats row g-0 border-top border-bottom border-secondary py-3 mb-4">
                    <div className="col-6 border-end border-secondary">
                      <h5 className="text-white mb-0">{orders.length}</h5>
                      <span className="text-light x-small">TOTAL ORDERS</span>
                    </div>
                    <div className="col-6">
                      <h5 className="text-white mb-0">Member</h5>
                      <span className="text-light x-small">STATUS</span>
                    </div>
                  </div>

                  <button className="btn btn-gold-sm w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2" onClick={() => setEditing(true)}>
                    <FaEdit /> Edit Profile
                  </button>
                  <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2" onClick={logout}>
                    <FaSignOutAlt /> Logout Account
                  </button>
                </>
              ) : (
                /* Edit Mode */
                <div className="text-start">
                  <div className="mb-3">
                    <label className="text-gold x-small fw-bold mb-1">NAME</label>
                    <input className="form-control premium-input" name="name" value={profileForm.name} onChange={handleProfileChange} />
                  </div>
                  <div className="mb-3">
                    <label className="text-gold x-small fw-bold mb-1">PHONE</label>
                    <input className="form-control premium-input" name="phone" placeholder="+91 9876543210" value={profileForm.phone} onChange={handleProfileChange} />
                  </div>

                  <hr className="border-secondary" />
                  <h6 className="text-gold small fw-bold mb-3 d-flex align-items-center gap-2">
                    <FaMapMarkerAlt size={12} /> ADDRESS <span className="text-secondary fw-normal">(optional)</span>
                  </h6>

                  <div className="mb-3">
                    <label className="text-light x-small fw-bold mb-1">STREET</label>
                    <input className="form-control premium-input" name="address" placeholder="123 Street Name, Area" value={profileForm.address} onChange={handleProfileChange} />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="text-light x-small fw-bold mb-1">CITY</label>
                      <input className="form-control premium-input" name="city" placeholder="City" value={profileForm.city} onChange={handleProfileChange} />
                    </div>
                    <div className="col-6">
                      <label className="text-light x-small fw-bold mb-1">STATE</label>
                      <input className="form-control premium-input" name="state" placeholder="State" value={profileForm.state} onChange={handleProfileChange} />
                    </div>
                  </div>
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <label className="text-light x-small fw-bold mb-1">PINCODE</label>
                      <input className="form-control premium-input" name="zip" placeholder="140603" value={profileForm.zip} onChange={handleProfileChange} />
                    </div>
                    <div className="col-6">
                      <label className="text-light x-small fw-bold mb-1">COUNTRY</label>
                      <input className="form-control premium-input" name="country" placeholder="India" value={profileForm.country} onChange={handleProfileChange} />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-gold-solid flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2" onClick={handleSaveProfile} disabled={saving}>
                      <FaSave /> {saving ? "Saving..." : "Save"}
                    </button>
                    <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2" onClick={handleCancelEdit}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order History */}
          <div className="col-lg-8">
            <div className="orders-history-card p-4 rounded shadow-lg h-100">
              <h4 className="text-white mb-4 d-flex align-items-center gap-2">
                <FaHistory className="text-gold" /> Order History
              </h4>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-gold" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-light mt-3">Fetching your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <FaBoxOpen size={50} className="text-secondary mb-3" />
                  <h5 className="text-light">No orders found yet.</h5>
                  <p className="text-secondary small">Your journey with GoldenBite starts here!</p>
                </div>
              ) : (
                <div className="table-responsive orders-table-wrapper">
                  <table className="table table-dark table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th className="text-gold small border-secondary">ORDER ID</th>
                        <th className="text-gold small border-secondary text-center">DATE</th>
                        <th className="text-gold small border-secondary text-center">TOTAL</th>
                        <th className="text-gold small border-secondary text-center">STATUS</th>
                        <th className="text-gold small border-secondary text-end">INVOICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.order_id}>
                          <td className="text-white small fw-bold">#{o.order_id.slice(-8)}</td>
                          <td className="text-light x-small text-center">
                            <div className="d-flex flex-column">
                              {(() => {
                                const d = o.created_at ? new Date(o.created_at * 1000) : new Date(o.createdAt);
                                return (
                                  <>
                                    <span><FaCalendarAlt size={10} className="me-1" /> {d.toLocaleDateString()}</span>
                                    <span className="opacity-50">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  </>
                                );
                              })()}
                            </div>
                          </td>
                          <td className="text-white fw-bold text-center">
                            <FaRupeeSign size={10} /> {o.amount / 100}
                          </td>
                          <td className="text-center">
                            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                              <span className={`badge px-3 py-1 ${
                                ['cancelled', 'failed'].includes(o.status.toLowerCase()) ? 'bg-danger' : 
                                o.status.toLowerCase() === 'preparing' ? 'bg-warning text-dark' : 
                                o.status.toLowerCase() === 'pending' ? 'bg-secondary text-white' : 
                                o.status.toLowerCase() === 'out for delivery' ? 'bg-info text-dark' :
                                o.status.toLowerCase() === 'completed' ? 'bg-success' :
                                'status-badge-paid'
                              }`}>
                                {o.status.toUpperCase()}
                              </span>
                              <button 
                                className="btn btn-link p-0 text-gold small text-decoration-none fw-bold" 
                                style={{fontSize: '0.75rem'}}
                                onClick={() => setTrackingOrder(o)}
                              >
                                {['cancelled', 'completed'].includes(o.status.toLowerCase()) ? 'View Specs' : 'Track Live'}
                              </button>
                            </div>
                          </td>
                          <td className="text-end">
                            <a
                              href={`http://192.168.1.2:3000/invoices/${o.order_id}.pdf`}
                              target="_blank"
                              className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                              rel="noreferrer"
                            >
                              <FaFileDownload size={12} /> PDF
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {renderTrackerModal()}
    </div>
  );
}
