
import React, { useState } from 'react';
import { User, UserRole, MaintenanceRequest } from '../types';

interface MaintenanceProps {
  user: User;
}

const Maintenance: React.FC<MaintenanceProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    { id: '1', flatId: 'A-101', userId: 'user-1', description: 'Leaking tap in bathroom', status: 'OPEN', createdAt: '2023-10-10' },
    { id: '2', flatId: 'B-201', userId: 'user-2', description: 'AC service needed', status: 'IN_PROGRESS', createdAt: '2023-10-08' },
    { id: '3', flatId: 'A-101', userId: 'user-1', description: 'Electric fuse box check', status: 'RESOLVED', createdAt: '2023-10-01' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [desc, setDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: MaintenanceRequest = {
      id: Math.random().toString(36).substr(2, 9),
      flatId: user.flatId || 'N/A',
      userId: user.id,
      description: desc,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRequests([newReq, ...requests]);
    setShowModal(false);
    setDesc('');
  };

  const updateStatus = (id: string, newStatus: any) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Maintenance Tickets</h2>
          <p className="text-slate-500">Report issues and track repairs.</p>
        </div>
        {!isOwner && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            New Request
          </button>
        )}
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">#{req.id.toUpperCase()}</span>
                <span className="text-sm font-semibold text-slate-900">Flat {req.flatId}</span>
                <span className="text-xs text-slate-400">• {req.createdAt}</span>
              </div>
              <p className="text-slate-700 text-sm font-medium">{req.description}</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                req.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                req.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
              }`}>
                {req.status.replace('_', ' ')}
              </span>

              {isOwner && req.status !== 'RESOLVED' && (
                <div className="flex gap-2">
                  {req.status === 'OPEN' && (
                    <button 
                      onClick={() => updateStatus(req.id, 'IN_PROGRESS')}
                      className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded font-bold transition-colors"
                    >
                      Start Work
                    </button>
                  )}
                  <button 
                    onClick={() => updateStatus(req.id, 'RESOLVED')}
                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded font-bold hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Report Issue</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Describe the problem</label>
                <textarea 
                  required 
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. Broken window in the living room..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
