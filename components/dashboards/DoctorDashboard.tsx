
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { DashboardIcon, CalendarIcon, UsersIcon, UserIcon } from '../icons/Icons';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOCK_APPOINTMENTS } from '../../constants';
import { AppointmentStatus } from '../../types';
import { CheckCircleIcon, XCircleIcon } from '../icons/Icons';

const AppointmentStatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
    const statusClasses = {
        [AppointmentStatus.Approved]: 'bg-green-100 text-green-800',
        [AppointmentStatus.Pending]: 'bg-yellow-100 text-yellow-800',
        [AppointmentStatus.Rejected]: 'bg-red-100 text-red-800',
        [AppointmentStatus.Completed]: 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const DashboardHome = () => {
    const pendingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === AppointmentStatus.Pending);
    const approvedToday = MOCK_APPOINTMENTS.filter(a => a.status === AppointmentStatus.Approved && new Date(a.date).toDateString() === new Date().toDateString());

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Doctor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
                    <p className="text-4xl font-bold text-primary-600">{pendingAppointments.length}</p>
                    <p className="text-gray-500">appointments need your review.</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Appointments Today</h3>
                    <p className="text-4xl font-bold text-primary-600">{approvedToday.length}</p>
                    <p className="text-gray-500">patients to see today.</p>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                    <p className="text-4xl font-bold text-primary-600">
                        {[...new Set(MOCK_APPOINTMENTS.map(a => a.patientName))].length}
                    </p>
                    <p className="text-gray-500">under your care.</p>
                </Card>
            </div>
             <div className="mt-8">
                <AppointmentRequests />
            </div>
        </div>
    );
};

const AppointmentRequests = () => {
     return (
        <Card>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointment Requests</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Patient</th>
                            <th scope="col" className="px-6 py-3">Date & Time</th>
                            <th scope="col" className="px-6 py-3">Mode</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_APPOINTMENTS.map(app => (
                            <tr key={app.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {app.patientName}
                                </td>
                                <td className="px-6 py-4">{app.date} at {app.time}</td>
                                <td className="px-6 py-4">{app.mode}</td>
                                <td className="px-6 py-4"><AppointmentStatusBadge status={app.status}/></td>
                                <td className="px-6 py-4">
                                    {app.status === AppointmentStatus.Pending ? (
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50">
                                                <CheckCircleIcon className="w-5 h-5" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                                                <XCircleIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

const DoctorDashboard: React.FC = () => {
  const doctorNavItems = [
    { path: '/doctor', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { path: '/doctor/schedule', name: 'My Schedule', icon: <CalendarIcon className="w-5 h-5" /> },
    { path: '/doctor/patients', name: 'My Patients', icon: <UsersIcon className="w-5 h-5" /> },
    { path: '/doctor/profile', name: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout navItems={doctorNavItems}>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="schedule" element={<AppointmentRequests />} />
        {/* Other doctor routes can be added here */}
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
