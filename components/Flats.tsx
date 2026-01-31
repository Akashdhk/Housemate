import React, { useState } from 'react';
import { User, UserRole, Flat } from '../types';

interface FlatsProps {
  user: User;
}

const Flats: React.FC<FlatsProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;
  const [flats, setFlats] = useState<Flat[]>([
    { id: '1', name: 'A-101', ownerId: 'owner-1', tenantId: 'tenant-1', cost: 15000, description: 'Luxury 2BHK' },
    { id: '2', name: 'A-102', ownerId: 'owner-1', cost: 12000, description: 'Standard 2BHK' },
    { id: '3', name: 'B-201', ownerId: 'owner-1', tenantId: 'tenant-2', cost: 25000, description: 'Premium 3BHK' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFlat, setNewFlat] = useState({ name: '', cost: 0, description: '' });

  const handleAddFlat = (e: React.FormEvent) => {
    e.preventDefault();
    const flatToAdd: Flat = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFlat.name,
      cost: Number(newFlat.cost),
      description: newFlat.description,
      ownerId: user.id
    };
    setFlats([...flats, flatToAdd]);
    setShowAddModal(false);
    setNewFlat({ name: '', cost: 0, description: '' });
  };

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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
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
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${flat.tenantId ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                {flat.tenantId ? 'Occupied' : 'Vacant'}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Monthly Cost:</span>
                <span className="text-slate-900 font-bold">৳{flat.cost}</span>
              </div>
              <div className="text-sm">
                <p className="text-slate-500 font-medium mb-1">Description:</p>
                <p className="text-slate-700">{flat.description || 'No description available.'}</p>
              </div>
              <div className="pt-4 flex gap-2">
                <button className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded font-semibold text-sm hover:bg-indigo-100 transition-colors">
                  Details
                </button>
                {isOwner && (
                  <button className="px-3 bg-slate-50 text-slate-400 py-2 rounded hover:bg-red-50 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900">Add New Flat Unit</h3>
            <form onSubmit={handleAddFlat} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Flat Number / Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="e.g. C-404"
                  value={newFlat.name}
                  onChange={e => setNewFlat({...newFlat, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Cost (৳)</label>
                <input 
                  type="number" 
                  required 
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="12000"
                  value={newFlat.cost}
                  onChange={e => setNewFlat({...newFlat, cost: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Amenities, floor level, etc."
                  value={newFlat.description}
                  onChange={e => setNewFlat({...newFlat, description: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
                >
                  Create Flat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flats;