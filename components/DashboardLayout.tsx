
import React, { useState, Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { LogOutIcon } from './icons/Icons';

interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  navItems: NavItem[];
  children: React.ReactNode;
}

const Sidebar: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">Medisync</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        >
          <LogOutIcon className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

const Header: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 h-16 flex items-center justify-end">
                <div className="flex items-center">
                    <div className="text-right mr-4">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt="User avatar" />
                </div>
            </div>
        </header>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ navItems, children }) => {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
