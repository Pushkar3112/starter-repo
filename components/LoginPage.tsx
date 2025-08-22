
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import type { Role } from '../types';
import { UserIcon, StethoscopeIcon, DashboardIcon } from './icons/Icons';
import Button from './ui/Button';

const RoleCard: React.FC<{
  role: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (role: Role) => void;
}> = ({ role, title, description, icon, onSelect }) => (
  <div
    className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-primary-500 transition-all duration-300 cursor-pointer flex flex-col items-center"
    onClick={() => onSelect(role)}
  >
    <div className="bg-primary-100 text-primary-600 rounded-full p-4 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 mb-4">{description}</p>
    <Button variant="primary" className="mt-auto">Login as {title}</Button>
  </div>
);

const LoginPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  const handleLogin = (role: Role) => {
    login(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
          Welcome to Medisync
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Your partner in comprehensive healthcare management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoleCard
            role="patient"
            title="Patient"
            description="Access your health records, book appointments, and connect with doctors."
            icon={<UserIcon className="w-8 h-8" />}
            onSelect={handleLogin}
          />
          <RoleCard
            role="doctor"
            title="Doctor"
            description="Manage your appointments, patient records, and professional schedule."
            icon={<StethoscopeIcon className="w-8 h-8" />}
            onSelect={handleLogin}
          />
          <RoleCard
            role="admin"
            title="Admin"
            description="Oversee hospital operations, manage staff, and view analytics."
            icon={<DashboardIcon className="w-8 h-8" />}
            onSelect={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
