
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Flats', path: '/flats', icon: '🏢' },
    { name: 'Bills & Payments', path: '/bills', icon: '💰' },
    { name: 'Maintenance', path: '/maintenance', icon: '🔧' },
  ];

  return (
    <aside className="w-64 bg-indigo-900 text-white flex-shrink-0 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">Housemate</h1>
        <p className="text-indigo-300 text-xs mt-1 uppercase tracking-widest font-semibold">
          {role === UserRole.OWNER ? 'Owner Panel' : 'Tenant Panel'}
        </p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-indigo-200 rounded-lg hover:bg-red-900 hover:text-white transition-colors"
        >
          <span className="mr-3 text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
