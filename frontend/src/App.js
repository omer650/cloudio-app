import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Search, CloudUpload, FileCog, Shield, Network, Database, Book } from 'lucide-react';

const API_URL = 'http://34.247.141.77:30081'; // Backend IP

const getIconForCategory = (name) => {
  switch (name) {
    case 'Customer Setups': return <CloudUpload size={48} color="#3b82f6" />;
    case 'Project Files': return <FileCog size={48} color="#10b981" />;
    case 'Admin Tools': return <Shield size={48} color="#ef4444" />;
    case 'Network Maps': return <Network size={48} color="#8b5cf6" />;
    case 'Data Backups': return <Database size={48} color="#f59e0b" />;
    case 'User Manuals': return <Book size={48} color="#64748b" />;
    default: return <Cloud size={48} color="#cbd5e1" />;
  }
};

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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Main Content - Centered */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', direction: 'ltr' }}>

        {/* Header & Search */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>

          {/* Logo / Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: '#38bdf8' }}>
            <Cloud size={48} />
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, color: '#f8fafc' }}>Cloudio</h1>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '40px', color: '#94a3b8' }}>Cloud Services Portal</h2>

          <div style={{ position: 'relative', width: '600px', maxWidth: '100%' }}>
            <Search style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={24} />
            <input
              type="text"
              placeholder="Search services..."
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

        {/* Service Cards Grid - Responsive (approx 3 in a row on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px',
          padding: '0 20px'
        }}>
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => window.location.href = `/service/${cat.id}`}
              style={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px',
                padding: '32px',
                borderRadius: '12px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                transition: 'all 0.3s ease',
                height: '240px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              {/* Status Indicator */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></div>
                <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '500' }}>Status: Active</span>
              </div>

              {/* Icon */}
              <div style={{ alignSelf: 'center', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
                {getIconForCategory(cat.name)}
              </div>

              {/* Title */}
              <span style={{ fontSize: '20px', fontWeight: '600', color: '#f1f5f9', textAlign: 'center' }}>{cat.name}</span>
            </div>
          ))}

          {filteredCategories.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', padding: '40px', fontSize: '18px' }}>
              No services found matching "{searchTerm}".
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
