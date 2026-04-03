import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSave } from 'react-icons/fa';
import { getJSON, deleteJSON, postJSON, putJSON } from '../../utils/api';

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    price: '',
    image: '',
    imageFile: null,
    isAvailable: true
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getJSON('/api/admin/menu');
      setItems(data || []);
    } catch (err) {
      console.error("Failed to fetch menu", err);
    }
  };

  const deleteItem = async (id) => {
    if(!window.confirm("Are you sure you want to delete this menu item entirely?")) return;
    try {
      await deleteJSON(`/api/admin/menu/${id}`);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      console.error("Failed to delete menu item", err);
    }
  };

  const toggleAvailability = async (item) => {
    try {
      const updated = await putJSON(`/api/admin/menu/${item._id}`, { isAvailable: !item.isAvailable });
      setItems(items.map(i => i._id === item._id ? updated : i));
    } catch (err) {
      console.error("Failed to toggle availability", err);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'General', price: '', image: '', isAvailable: true });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.name || item.title || '',
      description: item.description || '',
      category: item.category || 'General',
      price: item.price || '',
      image: item.image || '',
      imageFile: null,
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('name', formData.title);
      dataToSubmit.append('title', formData.title);
      dataToSubmit.append('description', formData.description);
      dataToSubmit.append('category', formData.category);
      dataToSubmit.append('price', formData.price);
      dataToSubmit.append('isAvailable', formData.isAvailable);
      
      if (formData.imageFile) {
        dataToSubmit.append('image', formData.imageFile);
      } else if (typeof formData.image === 'string') {
        dataToSubmit.append('image', formData.image);
      }

      if (editingItem) {
        const updated = await putJSON(`/api/admin/menu/${editingItem._id}`, dataToSubmit);
        setItems(items.map(i => i._id === editingItem._id ? updated : i));
      } else {
        const added = await postJSON('/api/admin/menu', dataToSubmit);
        setItems([...items, added]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save menu item", err);
      alert("Error saving item: " + err.message + "\nCheck console.");
    }
  };

  return (
    <div className="admin-card position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0 text-dark">Menu Catalog</h5>
        <button onClick={openAddModal} className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" style={{backgroundColor: '#4318FF', border: 'none'}}>
          <FaPlus /> Add New Item
        </button>
      </div>

      <div className="table-responsive">
        <table className="table admin-table align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td style={{width: '80px'}}>
                  {item.image && item.image.startsWith('http') ? (
                     <img src={item.image} alt={item.title || item.name} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px'}} />
                  ) : (
                     <div style={{width: '50px', height: '50px', background: '#f4f7fe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>
                       {item.image || '🍽️'}
                     </div>
                  )}
                </td>
                <td>
                  <div className="fw-bold text-dark">{item.title || item.name}</div>
                  {item.description && <div className="text-muted" style={{fontSize: '0.8rem'}}>{item.description}</div>}
                </td>
                <td className="text-muted">{item.category}</td>
                <td className="fw-bold text-success">₹{item.price}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="form-check form-switch m-0 p-0 me-2" style={{minHeight: '20px'}}>
                      <input 
                        className="form-check-input cursor-pointer m-0" 
                        type="checkbox" 
                        checked={item.isAvailable !== false} 
                        onChange={() => toggleAvailability(item)}
                        style={{height: '20px', width: '40px'}}
                      />
                    </div>
                    <span className={`badge ${item.isAvailable !== false ? 'bg-success' : 'bg-danger'}`}>
                      {item.isAvailable !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </td>
                <td>
                  <button onClick={() => openEditModal(item)} className="btn btn-sm btn-light text-primary me-2 border-0"><FaEdit /></button>
                  <button onClick={() => deleteItem(item._id)} className="btn btn-sm btn-light text-danger border-0"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="6" className="text-center py-5 text-muted">No menu items found. Click 'Add New Item' to begin building your catalog.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modal Backdrop & Form */}
      {isModalOpen && (
        <>
        <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
        <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-bold m-0">{editingItem ? 'Edit Menu Item' : 'Add New Item'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body pt-4">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <label className="form-label text-muted small fw-bold">Item Name / Title</label>
                      <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Classic Cheeseburger" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-muted small fw-bold">Portion / Description (Optional)</label>
                      <input type="text" className="form-control" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="e.g. 6 pieces, 1 kg, Extra Spicy" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label text-muted small fw-bold">Category</label>
                      <input type="text" className="form-control" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Burgers" />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-muted small fw-bold">Price (₹)</label>
                      <input type="number" className="form-control" required min="1" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="199" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Image Upload</label>
                    <input type="file" accept="image/*" className="form-control" onChange={e => setFormData({...formData, imageFile: e.target.files[0]})} />
                    {formData.image && typeof formData.image === 'string' && !formData.image.startsWith('http') && (
                      <small className="text-muted d-block mt-1">Current Image: {formData.image}</small>
                    )}
                    {formData.image && typeof formData.image === 'string' && formData.image.startsWith('http') && (
                      <small className="text-muted d-block mt-1">
                        Current Image: <a href={formData.image} target="_blank" rel="noreferrer">View</a> (Upload new file to securely replace)
                      </small>
                    )}
                  </div>
                  <div className="form-check form-switch mt-4 mb-2 d-flex align-items-center">
                    <input className="form-check-input cursor-pointer fs-5 m-0" type="checkbox" checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} id="isAvailableSwitch" />
                    <label className="form-check-label ms-2 fw-bold" htmlFor="isAvailableSwitch" style={{fontSize: '0.9rem', color: formData.isAvailable ? '#198754' : '#dc3545'}}>
                      {formData.isAvailable ? "Item is publicly displayed & In Stock" : "Item is hidden / Out of Stock"}
                    </label>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                    <button type="button" className="btn btn-light me-2 fw-bold text-muted border-0" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-4 fw-bold" style={{backgroundColor: '#4318FF', border: 'none'}}>
                      <FaSave className="me-2" /> {editingItem ? 'Save Changes' : 'Publish Item'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default AdminMenu;
