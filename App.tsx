
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Flats from './components/Flats';
import Bills from './components/Bills';
import Maintenance from './components/Maintenance';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for a session
    const savedUser = localStorage.getItem('housemate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('housemate_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {user && <Sidebar role={user.role} onLogout={handleLogout} />}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {user && <Header user={user} />}
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route 
                path="/login" 
                element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />} 
              />
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/flats" 
                element={user ? <Flats user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/bills" 
                element={user ? <Bills user={user} /> : <Navigate to="/login" />} 
              />
               <Route 
                path="/maintenance" 
                element={user ? <Maintenance user={user} /> : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
