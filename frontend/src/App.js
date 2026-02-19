import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud, Search, FileText, Shield, Network, Database, BookOpen, ChevronLeft, FolderOpen } from 'lucide-react';

// כתובות ה-IP של השירותים (Backend ו-Elasticsearch)
const BACKEND_URL = 'http://34.247.141.77:30081';
const ES_URL = 'http://34.247.141.77:30091';

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // משתנה למעקב אחרי התיקייה שנבחרה (Navigation State)
  const [selectedFolder, setSelectedFolder] = useState(null);

  const defaultFolders = [
    { id: 1, title: "Customer Setups", icon: <Cloud size={34} color="#38bdf8" /> },
    { id: 2, title: "Project Files", icon: <FileText size={34} color="#94a3b8" /> },
    { id: 3, title: "Security Protocols", icon: <Shield size={34} color="#10b981" /> },
    { id: 4, title: "Network Maps", icon: <Network size={34} color="#818cf8" /> },
    { id: 5, title: "Data Backups", icon: <Database size={34} color="#f59e0b" /> },
    { id: 6, title: "User Manuals", icon: <BookOpen size={34} color="#f472b6" /> },
  ];

  useEffect(() => {
    setLoading(true);

    if (searchQuery) {
      // חיפוש דרך Elasticsearch (פורט 30091)
      axios.get(`${ES_URL}/files/_search?q=${searchQuery}`) // Assuming index is 'files' or similar, or just global search
        .then(res => {
          // המרת מבנה התשובה של ES למבנה שהאפליקציה מכירה
          const hits = res.data.hits && res.data.hits.hits ? res.data.hits.hits : [];
          const mappedItems = hits.map(hit => hit._source);
          setItems(mappedItems);
          setLoading(false);
        })
        .catch(err => {
          console.error("Elasticsearch Error:", err);
          setLoading(false);
        });
    } else {
      // שליפת כל הקבצים מה-Backend (פורט 30081)
      axios.get(`${BACKEND_URL}/files`)
        .then(res => {
          setItems(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Backend Error:", err);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  const filteredFolders = defaultFolders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- לוגיקת ניווט ---
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBack = () => {
    setSelectedFolder(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
      backgroundSize: '30px 30px',
      color: '#f8fafc',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 15px'
    }}>

      {/* תצוגה מותנית: אם נבחרה תיקייה, הצג את דף התיקייה. אחרת, הצג את הדשבורד */}
      {!selectedFolder ? (
        /* --- מסך דשבורד ראשי --- */
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px', width: '100%', maxWidth: '450px' }}>
            <h1 style={{ fontSize: '54px', fontWeight: '800', margin: '0 0 18px 0', letterSpacing: '-1.5px' }}>
              Cloudio
            </h1>

            <div style={{ position: 'relative', width: '100%' }}>
              <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
              <input
                type="text"
                placeholder="Search folders, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            width: '100%',
            maxWidth: '850px'
          }}>
            {filteredFolders.map(folder => (
              <FolderCard
                key={folder.id}
                icon={folder.icon}
                title={folder.title}
                onClick={() => handleFolderClick(folder)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* --- מסך תוכן תיקייה (Folder Detail) --- */
        <div style={{ width: '100%', maxWidth: '900px', animation: 'fadeIn 0.3s ease' }}>

          {/* Header התיקייה עם Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <button
              onClick={handleBack}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                color: 'white',
                padding: '8px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <div style={{ fontSize: '14px', color: '#64748b' }}>
              Cloudio <span style={{ margin: '0 8px' }}>/</span> <span style={{ color: '#f8fafc', fontWeight: '600' }}>{selectedFolder.title}</span>
            </div>
          </div>

          <header style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '30px',
            marginBottom: '40px',
            padding: '20px',
            backgroundColor: 'rgba(30, 41, 59, 0.3)',
            borderRadius: '20px',
            border: '1px solid rgba(51, 65, 85, 0.5)'
          }}>
            <div style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '15px', border: '1px solid #334155' }}>
              {selectedFolder.icon}
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: 0 }}>{selectedFolder.title}</h2>
              <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>Exploring resources within this directory.</p>
            </div>
          </header>

          {/* Placeholder לתוכן עתידי */}
          <div style={{
            height: '300px',
            border: '2px dashed #1e293b',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#334155'
          }}>
            <FolderOpen size={48} style={{ marginBottom: '15px', opacity: 0.5 }} />
            <p style={{ fontSize: '16px', fontWeight: '500' }}>This folder is currently empty</p>
            <span style={{ fontSize: '13px' }}>Sub-folders and files will appear here in the next step.</span>
          </div>
        </div>
      )}

      {!loading && items.length > 0 && !selectedFolder && (
        <div style={{ marginTop: '20px', fontSize: '10px', color: '#334155' }}>
          ES Sync: Active ({items.length} records)
        </div>
      )}
    </div>
  );
}

const FolderCard = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '25px 15px',
      borderRadius: '16px',
      border: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    <div>{icon}</div>
    <span style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>{title}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
      <span style={{ fontSize: '10px', color: '#64748b' }}>Status: Active</span>
    </div>
  </div>
);

export default App;