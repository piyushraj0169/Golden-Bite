import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaCarSide } from 'react-icons/fa';
import { getJSON, postJSON } from '../../utils/api';

function AdminDelivery() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const data = await getJSON('/api/admin/delivery');
      setAgents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAgent = async (e) => {
    e.preventDefault();
    try {
      const newAgent = await postJSON('/api/admin/delivery', { name, phone, vehicleNumber: vehicle });
      setAgents([...agents, newAgent]);
      setName(""); setPhone(""); setVehicle("");
    } catch (err) {
      console.error(err);
      alert("Error adding delivery agent");
    }
  };

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="admin-card">
          <h5 className="fw-bold mb-4">Add Delivery Agent</h5>
          <form onSubmit={addAgent}>
            <div className="mb-3">
              <label className="form-label text-muted">Full Name</label>
              <input required type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Phone Number</label>
              <input required type="text" className="form-control" value={phone} onChange={e=>setPhone(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted">Vehicle Registration</label>
              <input required type="text" className="form-control" value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="e.g. MH01-AB-1234"/>
            </div>
            <button type="submit" className="btn btn-primary w-100" style={{backgroundColor: '#4318FF', border: 'none'}}>
              <FaPlus className="me-2"/> Add Agent
            </button>
          </form>
        </div>
      </div>

      <div className="col-md-8">
        <div className="admin-card h-100">
          <h5 className="fw-bold mb-4">Active Agents</h5>
          <div className="table-responsive">
            <table className="table admin-table align-middle">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Contact</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(a => (
                  <tr key={a._id}>
                    <td className="fw-bold">
                      <FaCarSide className="me-2" style={{color: '#a3aed1'}}/>
                      {a.name}
                    </td>
                    <td>{a.phone}</td>
                    <td><span className="badge bg-light text-dark">{a.vehicleNumber}</span></td>
                    <td>
                      <span className={`status-badge status-${a.status==='Available'?'completed':(a.status==='Offline'?'cancelled':'preparing')}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {agents.length === 0 && <tr><td colSpan="4" className="text-center py-4">No agents registered.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDelivery;
