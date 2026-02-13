import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Cloud, Activity, Database, Settings, Shield, Plus } from 'lucide-react';

const API_URL = 'http://34.247.141.77:30081'; // Backend IP

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/items`)
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar - Stitch Style */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#38bdf8' }}>
          <Cloud size={32} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Cloudio</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Cloud size={20} />} label="Cloud Resources" />
          <NavItem icon={<Activity size={20} />} label="Monitoring" />
          <NavItem icon={<Database size={20} />} label="Backups" />
          <NavItem icon={<Shield size={20} />} label="Security" />
          <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
            <NavItem icon={<Settings size={20} />} label="Settings" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', direction: 'ltr' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '30px', margin: 0 }}>Cloud Inventory</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0' }}>Overview of your infrastructure across all regions.</p>
          </div>
          <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <Plus size={18} /> Create Instance
          </button>
        </header>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          <StatCard label="Total Resources" value={items.length} change="+12%" />
          <StatCard label="Active Instances" value={items.length > 0 ? items.length - 1 : 0} change="94% Active" color="#10b981" />
          <StatCard label="Pending Tasks" value="03" change="Attention" color="#f59e0b" />
        </div>

        {/* Inventory Table */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
          <h3 style={{ marginBottom: '20px' }}>Active Deployments</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>RESOURCE NAME</th>
                <th style={{ padding: '12px' }}>STATUS</th>
                <th style={{ padding: '12px' }}>REGION</th>
                <th style={{ padding: '12px' }}>UPTIME</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '16px 12px', fontWeight: '500' }}>{item.title || item.name}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>Healthy</span>
                  </td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>us-east-1</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>14d 6h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Helpers
const NavItem = ({ icon, label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', backgroundColor: active ? '#3b82f6' : 'transparent', cursor: 'pointer', transition: '0.2s' }}>
    {icon} <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
  </div>
);

const StatCard = ({ label, value, change, color = '#3b82f6' }) => (
  <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
    <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>{label}</p>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '8px' }}>
      <h4 style={{ fontSize: '32px', margin: 0 }}>{value}</h4>
      <span style={{ color: color, fontSize: '14px', fontWeight: '600' }}>{change}</span>
    </div>
  </div>
);

export default App;