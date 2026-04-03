import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUtensils, FaShoppingCart, FaTruck, FaMoneyBillWave, FaChartBar, FaCog, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { API_BASE } from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import './admin.css';

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const socket = io(API_BASE);

    socket.on('new_order', (orderData) => {
      setNotifications(prev => [orderData, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const unreadCount = notifications.length;

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
    { path: '/admin/orders', name: 'Orders', icon: <FaShoppingCart /> },
    { path: '/admin/menu', name: 'Menu', icon: <FaUtensils /> },
    { path: '/admin/delivery', name: 'Delivery', icon: <FaTruck /> },
    { path: '/admin/payments', name: 'Payments', icon: <FaMoneyBillWave /> },
    { path: '/admin/analytics', name: 'Analytics', icon: <FaChartBar /> },
    { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
  ];

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar shadow-sm">
        <div className="admin-brand">
          <h3 className="fw-bold text-primary m-0">Golden<span className="text-warning">Bite</span></h3>
          <p className="text-muted small m-0">Admin Panel</p>
        </div>
        <nav className="admin-nav mt-4">
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index} className="admin-nav-item">
                <Link
                  to={item.path}
                  className={`admin-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-header shadow-sm d-flex justify-content-between align-items-center px-4">
          <h4 className="m-0 fw-bold admin-page-title">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h4>
          <div className="admin-header-right d-flex align-items-center gap-4">
            <div className="admin-notification position-relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <FaBell size={20} className="text-secondary" />
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                  {unreadCount}
                </span>
              )}

              {/* Notification Dropdown Container */}
              {showDropdown && (
                <div className="dropdown-menu show position-absolute end-0 mt-3 shadow-lg border-0 py-0" style={{minWidth: '320px', zIndex: 1050}}>
                  <div className="bg-light px-3 py-2 fw-bold text-dark border-bottom d-flex justify-content-between align-items-center" style={{fontSize: '0.9rem'}}>
                    Recent Notifications
                    {unreadCount > 0 && (
                      <span 
                        className="badge bg-primary cursor-pointer text-white fw-medium" 
                        onClick={(e) => { e.stopPropagation(); setNotifications([]); }}
                      >
                        Clear All
                      </span>
                    )}
                  </div>
                  <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {notifications.length === 0 ? (
                      <div className="px-3 py-4 text-center text-muted small">No new notifications</div>
                    ) : (
                      notifications.map((notif, idx) => (
                        <div key={idx} className="px-3 py-2 border-bottom position-relative shadow-sm mb-1" style={{backgroundColor: '#ffffff'}}>
                          <strong className="d-block text-dark mb-1" style={{fontSize: '0.85rem'}}>New Order: <span className="text-primary">#{String(notif.order_id || 'N/A').substring(0,8)}</span></strong>
                          <span className="text-muted d-block" style={{fontSize: '0.8rem', lineHeight: '1.4'}}>{notif.customerName} placed an order for <strong className="text-success">₹{notif.amount}</strong>.</span>
                          <div className="text-muted mt-1" style={{fontSize: '0.7rem'}}>{new Date(notif.createdAt).toLocaleTimeString()}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="admin-profile position-relative cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <div className="d-flex align-items-center gap-2">
                <FaUserCircle size={32} className="text-secondary" />
                <div>
                  <p className="m-0 fw-bold" style={{fontSize: '0.9rem'}}>{user?.name || 'Admin User'}</p>
                  <p className="m-0 text-muted" style={{fontSize: '0.75rem'}}>Administrator</p>
                </div>
              </div>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="dropdown-menu show position-absolute end-0 mt-3 shadow-lg border-0 py-2" style={{minWidth: '200px', zIndex: 1050}}>
                  <div className="px-3 py-2 border-bottom mb-2">
                    <p className="m-0 fw-bold text-dark">{user?.name || 'Administrator'}</p>
                    <p className="m-0 text-muted small">{user?.email || 'admin@goldenbite.com'}</p>
                  </div>
                  <button className="dropdown-item text-danger d-flex align-items-center gap-2 py-2" onClick={logout}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="admin-content p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
