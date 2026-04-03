import React, { useState, useEffect } from 'react';
import { FaDownload, FaChartLine, FaTrophy, FaCalendarCheck, FaFileCsv } from 'react-icons/fa';
import { getJSON } from '../../utils/api';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getJSON('/api/admin/dashboard-stats?timeframe=all');
      setStats(data);
    } catch (err) {
      console.error("Failed to load analytics engine", err);
    }
    setLoading(false);
  };

  const createDownload = (filename, csvData) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTrendReport = () => {
    if (!stats?.analyticsChart) return;
    let csv = "Period,Revenue,Total Orders\n";
    stats.analyticsChart.forEach(row => {
      csv += `"${row.name}","${row.sales}","${row.orders}"\n`;
    });
    createDownload("revenue_trend_report.csv", csv);
  };

  const exportFullOrdersCSV = async () => {
    try {
      // Temporarily fetching from /api/admin/orders, which fetches everything.
      const orders = await getJSON('/api/admin/orders');
      let csv = "Order ID,Customer Name,Customer Email,Amount (INR),Status,Date\n";
      
      orders.forEach(o => {
        const id = o.order_id || o._id || 'Unknown';
        const name = o.userId?.name || 'Guest User';
        const email = o.userId?.email || 'N/A';
        const amt = ((o.amount || 0) / 100).toFixed(2);
        const status = o.status || 'pending';
        const date = new Date(o.createdAt).toLocaleDateString();
        
        csv += `"${id}","${name}","${email}","${amt}","${status}","${date}"\n`;
      });
      createDownload("full_orders_history.csv", csv);
    } catch(err) {
      console.error(err);
      alert("Failed to compile or download the massive order report.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}></div>
      </div>
    );
  }

  const topItems = stats?.insights?.topItems || [];

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h4 className="fw-bold m-0 text-dark"><FaChartLine className="me-2" style={{color: '#4318FF'}} /> Advanced Analytics</h4>
        <div className="d-flex gap-2">
          <button onClick={exportTrendReport} className="btn btn-light shadow-sm text-primary fw-bold px-3 border-0 d-flex align-items-center">
            <FaFileCsv className="me-2"/> Trend CSV
          </button>
          <button onClick={exportFullOrdersCSV} className="btn btn-primary shadow-sm fw-bold px-4 border-0 d-flex align-items-center" style={{backgroundColor: '#4318FF'}}>
            <FaDownload className="me-2"/> Export Full Orders
          </button>
        </div>
      </div>

      {/* Insight Highlight Banner Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="admin-card text-center py-4 d-flex flex-column justify-content-center h-100" style={{background: 'linear-gradient(135deg, #11b136 0%, #009223 100%)', color: 'white', borderRadius: '15px'}}>
            <div><FaTrophy size={40} className="mb-3 opacity-75" /></div>
            <h5 className="fw-bold mb-1 opacity-75">Champion Product (All Time)</h5>
            <h3 className="m-0 fw-bold">{topItems[0]?.name || 'Data Fetching...'}</h3>
            <p className="m-0 mt-2 fw-bold text-warning">{topItems[0]?.sold || 0} total units sold</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="admin-card text-center py-4 d-flex flex-column justify-content-center h-100" style={{background: 'linear-gradient(135deg, #4318FF 0%, #2b0bba 100%)', color: 'white', borderRadius: '15px'}}>
            <div><FaCalendarCheck size={40} className="mb-3 opacity-75" /></div>
            <h5 className="fw-bold mb-1 opacity-75">Peak Network Traffic Day</h5>
            <h3 className="m-0 fw-bold text-uppercase">{stats?.insights?.peakDay || 'Processing...'}</h3>
            <p className="m-0 mt-2 fw-bold text-info">Historically absolute highest transaction volume</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Massive Primary Data Area */}
        <div className="col-12 col-xl-8">
          <div className="admin-card h-100 shadow-sm border-0 pb-5">
            <h5 className="fw-bold mb-4 text-dark px-2 pt-2">Lifetime Revenue Growth Matrix</h5>
            <div style={{ width: '100%', height: '380px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.analyticsChart || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalesBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4318FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a0aec0', fontSize: 13}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#a0aec0', fontSize: 13}} dx={-10} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)'}}
                    labelStyle={{fontWeight: 'bold', color: '#2b3674'}}
                  />
                  <Area type="monotone" dataKey="sales" name="Total Revenue (₹)" stroke="#4318FF" strokeWidth={4} fillOpacity={1} fill="url(#colorSalesBlue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Vertical Stack */}
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          <div className="admin-card shadow-sm border-0 h-100 pb-0">
            <h5 className="fw-bold mb-4 text-dark px-2 pt-2">Top Selling Items</h5>
            <div className="table-responsive px-2">
              <table className="table align-middle border-0 mb-0">
                <tbody>
                  {topItems.map((item, i) => (
                    <tr key={i}>
                      <td style={{width: '45px', padding: '10px 0'}}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%', 
                          background: i === 0 ? '#11b136' : '#f4f7fe', 
                          color: i === 0 ? 'white' : '#4318FF', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          fontWeight: 'bold', fontSize: '1.2rem'
                        }}>
                          #{i+1}
                        </div>
                      </td>
                      <td className="fw-bold text-dark px-3">{item.name}</td>
                      <td className="text-end fw-bold text-success pe-0">{item.sold} sold</td>
                    </tr>
                  ))}
                  {topItems.length === 0 && (
                    <tr><td colSpan="3" className="text-center text-muted py-4">No AI sales aggregation available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-card shadow-sm border-0 pb-1">
            <h6 className="fw-bold text-dark mb-4 px-2 pt-2">Order Volume History</h6>
            <div style={{ width: '100%', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.analyticsChart || []} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                  <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}/>
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#a0aec0', fontSize: 11}} />
                  <Bar dataKey="orders" name="Order Count" fill="#00e396" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
