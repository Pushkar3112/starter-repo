
import type { User, Doctor, Appointment, MedicalRecord, Bill, Ambulance } from './types';
import { AppointmentStatus } from './types';

export const MOCK_USERS: { [key in 'patient' | 'doctor' | 'admin']: User } = {
  patient: { id: 'p001', name: 'John Doe', email: 'john.doe@example.com', role: 'patient', avatarUrl: 'https://picsum.photos/seed/p001/200' },
  doctor: { id: 'd001', name: 'Dr. Sarah Smith', email: 'sarah.smith@medisync.health', role: 'doctor', avatarUrl: 'https://picsum.photos/seed/d001/200' },
  admin: { id: 'a001', name: 'Admin User', email: 'admin@medisync.health', role: 'admin', avatarUrl: 'https://picsum.photos/seed/a001/200' },
};

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'd001', name: 'Dr. Sarah Smith', specialization: 'Cardiology', availability: ['Mon', 'Wed', 'Fri'], languages: ['English', 'Spanish'], gender: 'Female', hospital: 'Medisync General', experience: 12, rating: 4.8, reviews: 125, avatarUrl: 'https://picsum.photos/seed/d001/200', status: 'Approved' },
  { id: 'd002', name: 'Dr. Michael Chen', specialization: 'Neurology', availability: ['Tue', 'Thu'], languages: ['English', 'Mandarin'], gender: 'Male', hospital: 'Medisync Central', experience: 8, rating: 4.9, reviews: 98, avatarUrl: 'https://picsum.photos/seed/d002/200', status: 'Approved' },
  { id: 'd003', name: 'Dr. Emily White', specialization: 'Pediatrics', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], languages: ['English'], gender: 'Female', hospital: 'Medisync Childrens', experience: 15, rating: 4.7, reviews: 210, avatarUrl: 'https://picsum.photos/seed/d003/200', status: 'Approved' },
  { id: 'd004', name: 'Dr. David Lee', specialization: 'Orthopedics', availability: ['Mon', 'Wed'], languages: ['English', 'Korean'], gender: 'Male', hospital: 'Medisync General', experience: 10, rating: 4.6, reviews: 85, avatarUrl: 'https://picsum.photos/seed/d004/200', status: 'Pending' },
  { id: 'd005', name: 'Dr. Maria Garcia', specialization: 'Dermatology', availability: ['Tue', 'Fri'], languages: ['English', 'Spanish'], gender: 'Female', hospital: 'Medisync Central', experience: 7, rating: 4.9, reviews: 150, avatarUrl: 'https://picsum.photos/seed/d005/200', status: 'Approved' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'app001', patientName: 'John Doe', doctor: MOCK_DOCTORS[0], date: '2024-08-15', time: '10:00 AM', mode: 'In-Person', status: AppointmentStatus.Approved },
  { id: 'app002', patientName: 'Jane Roe', doctor: MOCK_DOCTORS[1], date: '2024-08-16', time: '02:00 PM', mode: 'Online', status: AppointmentStatus.Pending },
  { id: 'app003', patientName: 'Peter Jones', doctor: MOCK_DOCTORS[2], date: '2024-08-17', time: '11:30 AM', mode: 'In-Person', status: AppointmentStatus.Rejected },
  { id: 'app004', patientName: 'John Doe', doctor: MOCK_DOCTORS[2], date: '2024-07-20', time: '09:00 AM', mode: 'In-Person', status: AppointmentStatus.Completed },
  { id: 'app005', patientName: 'Alice Johnson', doctor: MOCK_DOCTORS[0], date: '2024-08-18', time: '03:00 PM', mode: 'Online', status: AppointmentStatus.Pending },
];

export const MOCK_RECORDS: MedicalRecord[] = [
  { id: 'rec001', type: 'Report', title: 'Annual Blood Test Results', date: '2024-06-10', doctorName: 'Dr. Sarah Smith', fileUrl: '#' },
  { id: 'rec002', type: 'Prescription', title: 'Medication for Hypertension', date: '2024-06-10', doctorName: 'Dr. Sarah Smith', fileUrl: '#' },
  { id: 'rec003', type: 'Report', title: 'X-Ray: Left Knee', date: '2023-11-22', doctorName: 'Dr. David Lee', fileUrl: '#' },
];

export const MOCK_BILLS: Bill[] = [
  { id: 'b001', service: 'Cardiology Consultation', date: '2024-06-10', amount: 250, status: 'Paid' },
  { id: 'b002', service: 'Pediatric Checkup', date: '2024-07-20', amount: 150, status: 'Unpaid' },
];

export const MOCK_AMBULANCES: Ambulance[] = [
    { id: 'amb01', driverName: 'Mike Ross', plateNumber: 'AMB 123', location: { lat: 34.0522, lng: -118.2437 }, status: 'Available' },
    { id: 'amb02', driverName: 'Jessica Pearson', plateNumber: 'AMB 456', location: { lat: 34.055, lng: -118.25 }, status: 'On-Duty' },
    { id: 'amb03', driverName: 'Harvey Specter', plateNumber: 'AMB 789', location: { lat: 34.048, lng: -118.24 }, status: 'Available' },
];

export const SPECIALIZATIONS = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General'];
export const LANGUAGES = ['English', 'Spanish', 'Mandarin', 'Korean', 'French'];
export const HOSPITAL_BRANCHES = ['Medisync General', 'Medisync Central', 'Medisync Childrens'];
