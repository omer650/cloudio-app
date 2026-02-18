import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Search, FileText, Shield, Network, Database, BookOpen, ChevronRight } from 'lucide-react';

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
      backgroundSize: '40px 40px',
      color: '#f8fafc',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px'
    }}>

      {/* Main Logo & Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '64px', fontWeight: '700', margin: '0 0 20px 0', letterSpacing: '-1px' }}>Cloudio</h1>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
          <input
            type="text"
            placeholder="Search folders..."
            style={{
              width: '100%',
              padding: '14px 14px 14px 50px',
              borderRadius: '12px',
              border: '1px solid #334155',
              backgroundColor: '#1e293b',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Folders Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '40px'
      }}>
        <FolderCard icon={<Cloud size={48} />} title="Customer Setups" />
        <FolderCard icon={<FileText size={48} />} title="Project Files" />
        <FolderCard icon={<Shield size={48} />} title="Security Protocols" />
        <FolderCard icon={<Network size={48} />} title="Network Maps" />
        <FolderCard icon={<Database size={48} />} title="Data Backups" />
        <FolderCard icon={<BookOpen size={48} />} title="User Manuals" />
      </div>

      {/* Footer Action */}
      <button style={{
        backgroundColor: 'transparent',
        color: '#94a3b8',
        border: '1px solid #334155',
        padding: '8px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
      }}>
        View Details <ChevronRight size={16} />
      </button>

      {/* Data Source Status (Internal Logic Kept) */}
      <div style={{ marginTop: 'auto', color: '#334155', fontSize: '12px' }}>
        Connected to {API_URL} | Active Resources: {items.length}
      </div>
    </div>
  );
}

// Sub-Component for Folder Cards
const FolderCard = ({ icon, title }) => (
  <div style={{
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(8px)',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'pointer'
  }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    {/* Status Indicator */}
    <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Status: Active</span>
    </div>

    <div style={{ color: '#f8fafc', marginTop: '10px' }}>{icon}</div>
    <span style={{ fontSize: '18px', fontWeight: '500', textAlign: 'center' }}>{title}</span>
  </div>
);

export default App;