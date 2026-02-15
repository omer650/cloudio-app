import React, { useState, useEffect } from 'react';
import {
  CloudUpload, FileCog, Shield, Network, Database, Book,
  Search, ArrowLeft, Activity, Lock, FolderOpen
} from 'lucide-react';

const iconMap = {
  'Customer Setups': { icon: CloudUpload, color: 'text-blue-400' },
  'Project Files': { icon: FileCog, color: 'text-emerald-400' },
  'Admin Tools': { icon: Shield, color: 'text-red-400' },
  'Network Maps': { icon: Network, color: 'text-violet-400' },
  'Data Backups': { icon: Database, color: 'text-amber-400' },
  'User Manuals': { icon: Book, color: 'text-slate-400' },
};

function App() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // האזנה לשינויים ב-URL (כדי שהכפתור "חזור" בדפדפן יעבוד)
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);

    // משיכת הנתונים מה-API של Cloudio
    fetch('http://34.247.141.77:30080/api/folders')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("API Error:", err));

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // --- לוגיקת תצוגת "בתוך תיקייה" ---
  if (currentPath.startsWith('/service/')) {
    const serviceId = currentPath.split('/').pop();
    const service = services.find(s => s.id.toString() === serviceId);

    return (
      <div className="min-h-screen bg-[#0f172a] text-white p-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services Portal
        </button>

        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-12 bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className="text-blue-400" size={24} />
                <span className="text-slate-500 font-mono text-sm">PATH: /root/services/{service?.name?.replace(' ', '_')}</span>
              </div>
              <h1 className="text-4xl font-bold">{service?.name || 'Service Storage'}</h1>
            </div>
            <div className="text-right">
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> SYSTEM ONLINE
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#1e293b]/50 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-400" /> Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg text-sm text-slate-400">
                    <span>Access log: User_Admin synchronized resource_{i}</span>
                    <span className="text-xs font-mono">2m ago</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1e293b]/50 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lock size={18} className="text-red-400" /> Security Info</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Encryption: AES-256<br />
                Access: Restricted to DevOps Role<br />
                Last Scan: Clean
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- תצוגת דאשבורד ראשי (המקורית שלך) ---
  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-12">
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Cloudio
        </h1>
        <p className="text-slate-400 text-lg">Cloud Services Portal</p>

        <div className="relative mt-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search cloud services..."
            className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-blue-500 transition-all shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const { icon: Icon, color } = iconMap[service.name] || { icon: Database, color: 'text-slate-400' };
          return (
            <div
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              className="group bg-[#1e293b] border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 hover:bg-[#242f44] transition-all cursor-pointer relative shadow-lg hover:scale-[1.02]"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <div className={`mb-6 p-4 rounded-xl bg-slate-900/50 inline-block group-hover:scale-110 transition-transform ${color}`}>
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{service.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Management portal for {service.name.toLowerCase()} assets.</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
