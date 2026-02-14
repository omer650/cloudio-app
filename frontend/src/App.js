import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Cloud, Activity, Database, Settings, Shield, Search, Folder } from 'lucide-react';

const API_URL = 'http://34.247.141.77:30081'; // Backend IP

function App() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Categories
    axios.get(`${API_URL}/categories`)
      .then(res => { setCategories(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <main style={{ flex: 1, padding: '60px', overflowY: 'auto', direction: 'ltr' }}>

        {/* Search Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '32px', color: '#e2e8f0' }}>Cloud Inventory</h2>

          <div style={{ position: 'relative', width: '600px', maxWidth: '100%' }}>
            <Search style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={24} />
            <input
              type="text"
              placeholder="Search folders..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '20px 24px 20px 64px',
                borderRadius: '16px',
                border: '1px solid #334155',
                backgroundColor: '#1e293b',
                color: 'white',
                fontSize: '18px',
                outline: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </div>
        </div>

        {/* Folders Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '48px',
          padding: '0 40px'
        }}>
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => console.log('Clicked category:', cat.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                borderRadius: '12px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Folder size={90} color="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', fontWeight: '500', color: '#cbd5e1', textAlign: 'center' }}>{cat.name}</span>
            </div>
          ))}

          {filteredCategories.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', padding: '40px' }}>
              No folders found.
            </div>
          )}
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

export default App;
