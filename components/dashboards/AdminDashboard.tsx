
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../DashboardLayout';
import { DashboardIcon, StethoscopeIcon, UsersIcon, AmbulanceIcon, BarChartIcon } from '../icons/Icons';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_AMBULANCES } from '../../constants';
import type { Doctor } from '../../types';

const chartData = [
  { name: 'Jan', Appointments: 400, Revenue: 2400 },
  { name: 'Feb', Appointments: 300, Revenue: 1398 },
  { name: 'Mar', Appointments: 200, Revenue: 9800 },
  { name: 'Apr', Appointments: 278, Revenue: 3908 },
  { name: 'May', Appointments: 189, Revenue: 4800 },
  { name: 'Jun', Appointments: 239, Revenue: 3800 },
  { name: 'Jul', Appointments: 349, Revenue: 4300 },
];

const DashboardHome = () => {
    const totalPatients = new Set(MOCK_APPOINTMENTS.map(a => a.patientName)).size;
    const totalDoctors = MOCK_DOCTORS.length;
    const totalAppointments = MOCK_APPOINTMENTS.length;
    const totalRevenue = 54206; // Mock data

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                    <p className="text-4xl font-bold text-primary-600">{totalPatients}</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Total Doctors</h3>
                    <p className="text-4xl font-bold text-primary-600">{totalDoctors}</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Total Appointments</h3>
                    <p className="text-4xl font-bold text-primary-600">{totalAppointments}</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                    <p className="text-4xl font-bold text-primary-600">${totalRevenue.toLocaleString()}</p>
                </Card>
            </div>
            <div className="mt-8">
                <Card>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Overview</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="Appointments" fill="#8884d8" />
                                <Bar yAxisId="right" dataKey="Revenue" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const ManageDoctors = () => (
    <Card>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Doctors</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Specialization</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_DOCTORS.map(doctor => (
                        <tr key={doctor.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">{doctor.name}</td>
                            <td className="px-6 py-4">{doctor.specialization}</td>
                            <td className="px-6 py-4">
                               <span className={`px-2 py-1 text-xs font-medium rounded-full ${doctor.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                   {doctor.status}
                               </span>
                            </td>
                            <td className="px-6 py-4">
                                {doctor.status === 'Pending' ? (
                                    <Button size="sm">Approve</Button>
                                ) : (
                                    <Button size="sm" variant="danger">Deactivate</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);


const AdminDashboard: React.FC = () => {
  const adminNavItems = [
    { path: '/admin', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { path: '/admin/doctors', name: 'Manage Doctors', icon: <StethoscopeIcon className="w-5 h-5" /> },
    { path: '/admin/patients', name: 'Manage Patients', icon: <UsersIcon className="w-5 h-5" /> },
    { path: '/admin/ambulances', name: 'Ambulance Fleet', icon: <AmbulanceIcon className="w-5 h-5" /> },
    { path: '/admin/reports', name: 'Reports', icon: <BarChartIcon className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout navItems={adminNavItems}>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="doctors" element={<ManageDoctors />} />
        {/* Other admin routes can be added here */}
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
