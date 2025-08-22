
import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { DashboardIcon, CalendarIcon, StethoscopeIcon, BotIcon, AmbulanceIcon, FileTextIcon } from '../icons/Icons';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_RECORDS, MOCK_BILLS, SPECIALIZATIONS, LANGUAGES, HOSPITAL_BRANCHES } from '../../constants';
import type { Doctor, Appointment, MedicalRecord, Bill } from '../../types';
import { AppointmentStatus } from '../../types';
import { getSymptomAnalysis } from '../../services/geminiService';
import { SendIcon } from '../icons/Icons';

// Sub-components for Patient Dashboard
const DashboardHome = () => {
    const upcomingAppointment = MOCK_APPOINTMENTS.find(a => a.status === AppointmentStatus.Approved && new Date(a.date) > new Date());
    const recentRecord = MOCK_RECORDS[0];

    return (
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Patient Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Upcoming Appointment</h3>
                    {upcomingAppointment ? (
                        <div>
                            <p className="text-gray-600">with <span className="font-medium">{upcomingAppointment.doctor.name}</span></p>
                            <p className="text-gray-600">{new Date(upcomingAppointment.date).toDateString()} at {upcomingAppointment.time}</p>
                            <p className="text-gray-600">{upcomingAppointment.doctor.specialization}</p>
                            <Button variant="secondary" size="sm" className="mt-4">View Details</Button>
                        </div>
                    ) : (
                        <p className="text-gray-500">No upcoming appointments.</p>
                    )}
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Medical Record</h3>
                    {recentRecord ? (
                        <div>
                            <p className="font-medium text-gray-800">{recentRecord.title}</p>
                            <p className="text-gray-600">Type: {recentRecord.type}</p>
                             <p className="text-sm text-gray-500">Date: {recentRecord.date}</p>
                            <Button variant="secondary" size="sm" className="mt-4">View Record</Button>
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent records.</p>
                    )}
                </Card>
                 <Card className="bg-primary-50">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Book an Ambulance</h3>
                    <p className="text-gray-600 mb-4">In case of emergency, book an ambulance instantly.</p>
                    <Button variant="danger">Request Now</Button>
                </Card>
            </div>
        </div>
    );
};

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Card className="flex flex-col">
        <div className="flex items-center mb-4">
            <img src={doctor.avatarUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover mr-4"/>
            <div>
                <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-primary-600 font-medium">{doctor.specialization}</p>
            </div>
        </div>
        <p className="text-sm text-gray-600 mb-1"><strong>Experience:</strong> {doctor.experience} years</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Hospital:</strong> {doctor.hospital}</p>
        <p className="text-sm text-gray-600 mb-4"><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t">
            <span>⭐ {doctor.rating} ({doctor.reviews} reviews)</span>
            <Button size="sm">Book Now</Button>
        </div>
    </Card>
);

const FindDoctor = () => (
    <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Find a Doctor</h2>
        <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input placeholder="Search by name..."/>
                <Select>
                    <option value="">All Specializations</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                 <Select>
                    <option value="">Any Language</option>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </Select>
                 <Select>
                    <option value="">Any Branch</option>
                    {HOSPITAL_BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </Select>
            </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DOCTORS.filter(d => d.status === 'Approved').map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
        </div>
    </div>
);

const AppointmentStatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
    const statusClasses = {
        [AppointmentStatus.Approved]: 'bg-green-100 text-green-800',
        [AppointmentStatus.Pending]: 'bg-yellow-100 text-yellow-800',
        [AppointmentStatus.Rejected]: 'bg-red-100 text-red-800',
        [AppointmentStatus.Completed]: 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>{status}</span>;
}

const MyAppointments = () => (
    <Card>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Doctor</th>
                        <th scope="col" className="px-6 py-3">Date & Time</th>
                        <th scope="col" className="px-6 py-3">Mode</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_APPOINTMENTS.map(app => (
                        <tr key={app.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img src={app.doctor.avatarUrl} className="w-8 h-8 rounded-full mr-3"/>
                                    <div>
                                        <p>{app.doctor.name}</p>
                                        <p className="text-xs text-gray-500">{app.doctor.specialization}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">{app.date} at {app.time}</td>
                            <td className="px-6 py-4">{app.mode}</td>
                            <td className="px-6 py-4"><AppointmentStatusBadge status={app.status}/></td>
                            <td className="px-6 py-4">
                                {app.status === AppointmentStatus.Pending && <Button size="sm" variant="danger">Cancel</Button>}
                                {app.status === AppointmentStatus.Completed && <Button size="sm" variant="ghost">Rate Doctor</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

const MedicalRecords = () => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Medical Records</h2>
            <Button>Upload New Record</Button>
        </div>
        <div className="space-y-4">
            {MOCK_RECORDS.map(rec => (
                <div key={rec.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{rec.title} <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${rec.type === 'Report' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{rec.type}</span></p>
                        <p className="text-sm text-gray-500">By {rec.doctorName} on {rec.date}</p>
                    </div>
                    <Button variant="secondary" size="sm">Download</Button>
                </div>
            ))}
        </div>
    </Card>
);

const SymptomChecker = () => {
    const [history, setHistory] = useState<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = useCallback(async () => {
        if (!message.trim() || loading) return;

        const newUserMessage = { role: 'user' as const, parts: [{ text: message }] };
        setHistory(prev => [...prev, newUserMessage]);
        setMessage('');
        setLoading(true);

        try {
            const stream = await getSymptomAnalysis(message, history);
            let modelResponse = '';
            setHistory(prev => [...prev, { role: 'model' as const, parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].parts[0].text = modelResponse;
                    return newHistory;
                });
            }
        } catch (error) {
            console.error(error);
            const errorMessage = { role: 'model' as const, parts: [{ text: 'Sorry, I am having trouble connecting. Please try again later.' }] };
             setHistory(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }, [message, history, loading]);

    return (
        <Card className="flex flex-col h-[calc(100vh-12rem)]">
             <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-3">Symptom Checker</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.map((entry, index) => (
                    <div key={index} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-lg px-4 py-2 rounded-lg ${entry.role === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {entry.parts[0].text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-4 border-t">
                <div className="flex items-center space-x-2">
                    <Input 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Describe your symptoms..."
                        className="flex-1"
                        disabled={loading}
                    />
                    <Button onClick={handleSendMessage} disabled={loading}>
                        {loading ? 'Thinking...' : <SendIcon className="w-5 h-5"/>}
                    </Button>
                </div>
            </div>
        </Card>
    );
};


const PatientDashboard: React.FC = () => {
  const patientNavItems = [
    { path: '/patient', name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { path: '/patient/find-doctor', name: 'Find a Doctor', icon: <StethoscopeIcon className="w-5 h-5" /> },
    { path: '/patient/appointments', name: 'My Appointments', icon: <CalendarIcon className="w-5 h-5" /> },
    { path: '/patient/records', name: 'Medical Records', icon: <FileTextIcon className="w-5 h-5" /> },
    { path: '/patient/symptom-checker', name: 'Symptom Checker', icon: <BotIcon className="w-5 h-5" /> },
    { path: '/patient/ambulance', name: 'Book Ambulance', icon: <AmbulanceIcon className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout navItems={patientNavItems}>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="find-doctor" element={<FindDoctor />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="records" element={<MedicalRecords />} />
        <Route path="symptom-checker" element={<SymptomChecker />} />
        {/* Other patient routes can be added here */}
      </Routes>
    </DashboardLayout>
  );
};

export default PatientDashboard;
