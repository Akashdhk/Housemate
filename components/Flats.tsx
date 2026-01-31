import React, { useState, useEffect } from 'react';
import { User, UserRole, Flat } from '../types';

interface FlatsProps {
  user: User;
}

const Flats: React.FC<FlatsProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFlat, setNewFlat] = useState({ name: '', cost: 0, description: '' });

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/flats');
      const data = await response.json();
      setFlats(data);
    } catch (err) {
      console.error("Failed to fetch flats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlat = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to call POST /api/flats would go here
    const mockId = Math.random().toString(36).substr(2, 9);
    setFlats([...flats, { ...newFlat, id: mockId, ownerId: user.id }]);
    setShowAddModal(false);
  };

  if (loading) return <div className="text-center py-10">Loading flats...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Flat Management</h2>
          <p className="text-slate-500">View and manage property assignments.</p>
        </div>
        {isOwner && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 shadow-md"
          >
            + Add New Flat
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flats.map((flat) => (
          <div key={flat.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-indigo-600 text-lg">{flat.name}</span>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${flat.tenantId ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                {flat.tenantId ? 'Occupied' : 'Vacant'}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Monthly Cost:</span>
                <span className="text-slate-900 font-bold">৳{flat.cost}</span>
              </div>
              <p className="text-sm text-slate-600 h-10 overflow-hidden">{flat.description || 'No description available.'}</p>
              <button className="w-full bg-indigo-50 text-indigo-700 py-2 rounded font-semibold text-sm hover:bg-indigo-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Add New Flat</h3>
            <form onSubmit={handleAddFlat} className="space-y-4">
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2 border rounded-lg" 
                placeholder="Flat Name (e.g. B-202)"
                value={newFlat.name}
                onChange={e => setNewFlat({...newFlat, name: e.target.value})}
              />
              <input 
                type="number" 
                required 
                className="w-full px-4 py-2 border rounded-lg" 
                placeholder="Monthly Cost (৳)"
                value={newFlat.cost}
                onChange={e => setNewFlat({...newFlat, cost: Number(e.target.value)})}
              />
              <textarea 
                className="w-full px-4 py-2 border rounded-lg" 
                placeholder="Description"
                value={newFlat.description}
                onChange={e => setNewFlat({...newFlat, description: e.target.value})}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flats;