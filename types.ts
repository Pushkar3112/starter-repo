
export type Role = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
  languages: string[];
  gender: 'Male' | 'Female' | 'Other';
  hospital: string;
  experience: number;
  rating: number;
  reviews: number;
  avatarUrl: string;
  status?: 'Approved' | 'Pending';
}

export enum AppointmentStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

export interface Appointment {
  id: string;
  patientName: string;
  doctor: Doctor;
  date: string;
  time: string;
  mode: 'In-Person' | 'Online';
  status: AppointmentStatus;
  reason?: string;
}

export interface MedicalRecord {
  id: string;
  type: 'Report' | 'Prescription';
  title: string;
  date: string;
  doctorName: string;
  fileUrl: string;
}

export interface Bill {
  id: string;
  service: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid';
}

export interface Ambulance {
  id: string;
  driverName: string;
  plateNumber: string;
  location: { lat: number; lng: number };
  status: 'Available' | 'On-Duty' | 'Offline';
}
