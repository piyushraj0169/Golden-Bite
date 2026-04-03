import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaMoneyBillWave, FaUsers, FaTruck, FaArrowUp, FaArrowDown, FaLightbulb, FaFire } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getJSON } from '../../utils/api';

function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('1d');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeDeliveries: 0,
    analyticsChart: [],
    changes: { orders: null, revenue: null, users: null },
    insights: { topItems: [], peakDay: 'N/A' }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getJSON(`/api/admin/dashboard-stats?timeframe=${timeframe}`);
        setStats({
          ...data,
          changes: data.changes || { orders: null, revenue: null, users: null },
          insights: data.insights || { topItems: [], peakDay: 'N/A' }
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, [timeframe]);

  const renderChange = (val) => {
    if (val === null) return null;
    const num = parseFloat(val);
    if (num > 0) return <span className="text-success ms-2" style={{fontSize: '0.85rem'}}><FaArrowUp size={10}/> {num}%</span>;
    if (num < 0) return <span className="text-danger ms-2" style={{fontSize: '0.85rem'}}><FaArrowDown size={10}/> {Math.abs(num)}%</span>;
    return <span className="text-muted ms-2" style={{fontSize: '0.85rem'}}>0%</span>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0 text-dark">Dashboard Overview</h4>
        <select 
          className="form-select w-auto shadow-sm" 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          style={{cursor: 'pointer', borderColor: '#4318FF', color: '#4318FF', fontWeight: 'bold'}}
        >
          <option value="1d">Today</option>
          <option value="1w">Last Week</option>
          <option value="1m">Last month</option>
          <option value="6m">Last 6 months</option>
          <option value="1y">Last 1 year</option>
          <option value="3y">Last 3 year</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        {/* Total Orders */}
        <div className="col-xl-3 col-sm-6">
          <div className="admin-stat-card d-flex align-items-center">
            <div className="stat-icon-wrapper bg-light-primary me-3">
              <FaShoppingCart />
            </div>
            <div>
              <p className="stat-title border-0 m-0 p-0 text-muted" style={{fontSize: '0.9rem', fontWeight: 600}}>Orders</p>
              <h4 className="stat-value d-flex align-items-center m-0">
                {stats.totalOrders}
                {renderChange(stats.changes.orders)}
              </h4>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-xl-3 col-sm-6">
          <div className="admin-stat-card d-flex align-items-center">
            <div className="stat-icon-wrapper bg-light-success me-3">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="stat-title border-0 m-0 p-0 text-muted" style={{fontSize: '0.9rem', fontWeight: 600}}>Revenue</p>
              <h4 className="stat-value d-flex align-items-center m-0">
                ₹{stats.totalRevenue.toFixed(2)}
                {renderChange(stats.changes.revenue)}
              </h4>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-xl-3 col-sm-6">
          <div className="admin-stat-card d-flex align-items-center">
            <div className="stat-icon-wrapper bg-light-warning me-3">
              <FaUsers />
            </div>
            <div>
              <p className="stat-title border-0 m-0 p-0 text-muted" style={{fontSize: '0.9rem', fontWeight: 600}}>New Users</p>
              <h4 className="stat-value d-flex align-items-center m-0">
                {stats.totalUsers}
                {renderChange(stats.changes.users)}
              </h4>
            </div>
          </div>
        </div>

        {/* Deliveries */}
        <div className="col-xl-3 col-sm-6">
          <div className="admin-stat-card d-flex align-items-center">
            <div className="stat-icon-wrapper bg-light-danger me-3">
              <FaTruck />
            </div>
            <div>
              <p className="stat-title border-0 m-0 p-0 text-muted" style={{fontSize: '0.9rem', fontWeight: 600}}>Active Deliveries</p>
              <h4 className="stat-value m-0 text-danger">{stats.activeDeliveries}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Insights Row */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="admin-card border-0" style={{background: 'linear-gradient(135deg, #4318FF 0%, #05cd99 100%)', color: 'white'}}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="d-flex align-items-center mb-3 mb-md-0">
                <FaLightbulb size={30} className="me-3 text-warning" />
                <div>
                  <h5 className="fw-bold m-0 text-white">Smart Insights</h5>
                  <p className="m-0 text-white-50" style={{fontSize:'0.9rem'}}>AI-driven performance metrics based on your selected timeframe.</p>
                </div>
              </div>
              <div className="d-flex gap-4">
                <div className="text-end">
                  <p className="m-0 text-white-50" style={{fontSize: '0.85rem'}}>Peak Order Day</p>
                  <h6 className="fw-bold m-0 text-white">{stats.insights.peakDay}</h6>
                </div>
                <div style={{width: '2px', background: 'rgba(255,255,255,0.2)'}}></div>
                <div className="text-end text-md-start">
                  <p className="m-0 text-white-50 d-flex align-items-center justify-content-end justify-content-md-start" style={{fontSize: '0.85rem'}}><FaFire className="text-warning me-1"/> Top Selling Items</p>
                  <h6 className="fw-bold m-0 text-white">
                    {stats.insights.topItems.length > 0 
                      ? stats.insights.topItems.map(i => `${i.name} (${i.sold})`).join(', ') 
                      : 'Not enough data'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="row g-4 mb-4">
        {/* Line Chart */}
        <div className="col-lg-8">
          <div className="admin-card">
            <h5 className="mb-4 fw-bold">Revenue Trend</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={stats.analyticsChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a0a0a0'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#a0a0a0'}} />
                  <Tooltip contentStyle={{backgroundColor: '#1a1a1a', borderColor: '#d4af37', color: '#fff'}} itemStyle={{color: '#d4af37'}} cursor={{stroke: '#333', strokeWidth: 2}} />
                  <Line type="monotone" dataKey="sales" stroke="#d4af37" strokeWidth={4} activeDot={{ r: 8, fill: '#d4af37', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-lg-4">
          <div className="admin-card">
            <h5 className="mb-4 fw-bold">Orders Volume</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={stats.analyticsChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a0a0a0'}} />
                  <Tooltip contentStyle={{backgroundColor: '#1a1a1a', borderColor: '#05cd99', color: '#fff'}} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} />
                  <Bar dataKey="orders" fill="#05cd99" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
