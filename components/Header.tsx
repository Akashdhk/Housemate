
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center flex-shrink-0">
      <div className="md:hidden flex items-center">
        <span className="text-indigo-600 font-bold text-xl mr-2">Housemate</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">{user.name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Header;
