import React, { useState, useEffect } from 'react';
import { FaBan, FaTrash, FaCheckCircle, FaHistory, FaTimes, FaEdit, FaSave } from 'react-icons/fa';
import { getJSON, deleteJSON, putJSON } from '../../utils/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // For orders history
  const [userOrders, setUserOrders] = useState([]);
  
  // Edit Form State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'user', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getJSON('/api/admin/users');
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const updated = await putJSON(`/api/admin/users/${id}/block`, {});
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: updated.isBlocked } : u));
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const deleteUserId = async (id) => {
    if(!window.confirm("Are you sure you want to completely delete this user?")) return;
    try {
      await deleteJSON(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const viewOrderHistory = async (user) => {
    setSelectedUser(user);
    try {
      const orders = await getJSON(`/api/admin/users/${user._id}/orders`);
      setUserOrders(orders);
    } catch (err) {
      console.error("Failed to fetch user orders", err);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'user',
      password: '' // blank defaults to no change
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        role: formData.role 
      };
      if (formData.password && formData.password.trim() !== '') {
        payload.password = formData.password;
      }
      
      const updated = await putJSON(`/api/admin/users/${editingUser._id}`, payload);
      setUsers(users.map(u => u._id === editingUser._id ? { ...u, ...updated } : u));
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Failed to update user", err);
      alert("Error updating user details. Check console.");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-card position-relative">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0 mb-3 mb-sm-0 text-dark">User Management</h5>
        <div className="input-group shadow-sm" style={{maxWidth: '300px'}}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search name, email, role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table admin-table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="fw-bold text-dark">{user.name}</td>
                <td>
                  <div style={{fontSize: '0.85rem'}}>{user.email}</div>
                  <div className="text-muted" style={{fontSize: '0.8rem'}}>{user.phone || 'No phone'}</div>
                </td>
                <td>
                  <span className={`status-badge ${user.role === 'admin' ? 'status-preparing' : 'status-completed'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.isBlocked ? 'status-cancelled' : 'status-completed'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="text-muted" style={{fontSize: '0.9rem'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => viewOrderHistory(user)} className="btn btn-sm btn-light text-info me-2 border-0" title="View Orders"><FaHistory /></button>
                  <button onClick={() => openEditModal(user)} className="btn btn-sm btn-light text-primary me-2 border-0" title="Edit Credentials"><FaEdit /></button>
                  <button 
                    onClick={() => toggleStatus(user._id)}
                    className={`btn btn-sm me-2 border-0 btn-light ${user.isBlocked ? 'text-success' : 'text-warning'}`}
                    title={user.isBlocked ? 'Unblock User' : 'Block User'}
                  >
                    {user.isBlocked ? <FaCheckCircle /> : <FaBan />}
                  </button>
                  <button onClick={() => deleteUserId(user._id)} className="btn btn-sm btn-light text-danger border-0" title="Delete User"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && <tr><td colSpan="6" className="text-center py-5 text-muted">No users found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <>
        <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-bold m-0">Edit User Profile</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
              </div>
              <div className="modal-body pt-4">
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Full Name</label>
                    <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Email Address</label>
                    <input type="email" className="form-control" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label text-muted small fw-bold">Phone Number</label>
                      <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-muted small fw-bold">System Role</label>
                      <select className="form-select" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="user">User / Customer</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 p-3 bg-light rounded border">
                    <label className="form-label text-danger small fw-bold">Force Password Reset</label>
                    <input type="password" className="form-control" placeholder="Leave blank to maintain current password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    <small className="text-muted d-block mt-1" style={{fontSize: '0.75rem'}}>Warning: Entering text here will immediately override the user's password with internal secure hashing.</small>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                    <button type="button" className="btn btn-light me-2 fw-bold text-muted border-0" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-4 fw-bold" style={{backgroundColor: '#4318FF', border: 'none'}}>
                      <FaSave className="me-2" /> Save Credentials
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Orders Modal Overlay */}
      {selectedUser && (
        <>
        <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-bold m-0 px-2 pt-2">Order History: {selectedUser.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body p-4">
                {userOrders.length === 0 ? (
                  <p className="text-muted text-center py-4">This user has no recorded orders.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table admin-table align-middle">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Placed On</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders.map(order => (
                          <tr key={order._id}>
                            <td className="text-primary fw-bold">{order.order_id || order._id.substring(0,8)}</td>
                            <td className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="fw-bold text-success">₹{((order.amount||0)/100).toFixed(2)}</td>
                            <td><span className={`status-badge status-${order.status || 'pending'}`}>{order.status}</span></td>
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
        </>
      )}
    </div>
  );
}

export default AdminUsers;
