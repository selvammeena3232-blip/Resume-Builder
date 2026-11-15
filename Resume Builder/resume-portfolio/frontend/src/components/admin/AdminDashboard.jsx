import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Users, 
  FileText, 
  ShieldCheck, 
  Download, 
  Search, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Activity, 
  Layers, 
  ArrowLeft, 
  LogOut, 
  Sparkles,
  TrendingUp,
  UserCheck,
  Lock
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    setViewMode, 
    user, 
    handleLogout,
    registeredUsers,
    handleApproveUser,
    handleRejectUser,
    handleDeleteUser
  } = useResume();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'templates'

  const [templatesList, setTemplatesList] = useState([
    { id: 'cascade', name: 'Foliofy Cascade', category: 'ATS Classic', active: true, usage: 512 },
    { id: 'primo', name: 'Foliofy Primo', category: 'Executive', active: true, usage: 384 },
    { id: 'cubic', name: 'Foliofy Cubic', category: 'Modern Tech', active: true, usage: 420 },
    { id: 'crisp', name: 'Foliofy Crisp', category: 'Clean & Minimal', active: true, usage: 290 },
    { id: 'diamond', name: 'Foliofy Diamond', category: 'Tech Lead', active: true, usage: 310 },
    { id: 'vibes', name: 'Foliofy Vibes', category: 'Creative Tech', active: true, usage: 275 },
    { id: 'modern', name: 'Modern Standard', category: 'General', active: true, usage: 610 },
    { id: 'creative', name: 'Creative Portfolio', category: 'Design & Visual', active: true, usage: 215 }
  ]);

  const toggleTemplateActive = (id) => {
    setTemplatesList(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const filteredUsers = (registeredUsers || []).filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1d', color: '#f8fafc', fontFamily: 'var(--font-sans)' }}>
      {/* Admin Top Header */}
      <header style={{ height: '70px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button 
            onClick={() => setViewMode('landing')}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
          >
            <ArrowLeft size={16} /> Back to Website
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.2rem', fontWeight: '900', color: '#ffffff' }}>
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #0073e6)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800' }}>
              ADMIN
            </span>
            <span>Foliofy Admin Control Panel</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.825rem', textAlign: 'right' }}>
            <div style={{ fontWeight: '800', color: '#ffffff' }}>{user?.name || 'Administrator'}</div>
            <div style={{ fontSize: '0.725rem', color: '#8b5cf6', fontWeight: '700' }}>{user?.role || 'Super Admin'}</div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="btn-icon"
            title="Log Out of Admin Panel"
            style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#f43f5e' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* Metric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0, 115, 230, 0.15)', color: '#0073e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Total Resumes Built</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginTop: '0.2rem' }}>1,428</div>
            </div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Registered Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginTop: '0.2rem' }}>892</div>
            </div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>ATS Score Audits</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginTop: '0.2rem' }}>3,410</div>
            </div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Download size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>PDF Exports</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginTop: '0.2rem' }}>5,120</div>
            </div>
          </div>
        </div>

        {/* Section Tabs Switcher */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('users')}
            style={{
              background: activeTab === 'users' ? '#0073e6' : 'transparent',
              color: activeTab === 'users' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Users size={16} /> User Management ({usersList.length})
          </button>

          <button 
            onClick={() => setActiveTab('templates')}
            style={{
              background: activeTab === 'templates' ? '#0073e6' : 'transparent',
              color: activeTab === 'templates' ? '#ffffff' : '#94a3b8',
              border: 'none',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Layers size={16} /> System Templates ({templatesList.length})
          </button>
        </div>

        {/* TAB 1: USERS MANAGEMENT TABLE */}
        {activeTab === 'users' && (
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>All System Users</h3>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="text" 
                  placeholder="Search user by name or email..." 
                  style={{ width: '100%', padding: '0.5rem 0.85rem 0.5rem 2.25rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '0.825rem', outline: 'none' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>User Name</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Role / Profession</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Auth Status</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Joined Date</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Admin Authorization Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: '800', color: '#ffffff' }}>{u.name}</td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: u.email.includes('admin') ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 115, 230, 0.15)', color: u.email.includes('admin') ? '#a78bfa' : '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                        {u.role || (u.isAdmin ? 'System Administrator' : 'User')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {u.status === 'Approved' && (
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle size={13} /> Authorized
                        </span>
                      )}
                      {u.status === 'Pending' && (
                        <span style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Activity size={13} /> Pending Admin Approval
                        </span>
                      )}
                      {u.status === 'Rejected' && (
                        <span style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', padding: '0.25rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <XCircle size={13} /> Rejected
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>{u.joined || '2026-08-04'}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {u.status !== 'Approved' && (
                          <button 
                            onClick={() => handleApproveUser(u.id)}
                            style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            title="Authorize user to log in"
                          >
                            <UserCheck size={13} /> Authorize / Approve
                          </button>
                        )}

                        {u.status === 'Pending' && (
                          <button 
                            onClick={() => handleRejectUser(u.id)}
                            style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', color: '#f59e0b', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <XCircle size={13} /> Reject
                          </button>
                        )}

                        {!u.email.includes('admin') && (
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete user ${u.name}?`)) {
                                handleDeleteUser(u.id);
                              }
                            }}
                            style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: SYSTEM TEMPLATES CONTROL */}
        {activeTab === 'templates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {templatesList.map((tpl) => (
              <div 
                key={tpl.id}
                style={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0073e6', textTransform: 'uppercase' }}>
                      {tpl.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: tpl.active ? '#10b981' : '#64748b', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {tpl.active ? <CheckCircle size={14} /> : <XCircle size={14} />} {tpl.active ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.25rem' }}>
                    {tpl.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Total Users Active: {tpl.usage}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Template Status:</span>
                  <button 
                    onClick={() => toggleTemplateActive(tpl.id)}
                    style={{
                      background: tpl.active ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      border: `1px solid ${tpl.active ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                      color: tpl.active ? '#f43f5e' : '#10b981',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    {tpl.active ? 'Disable Template' : 'Enable Template'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
