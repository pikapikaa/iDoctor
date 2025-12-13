export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string;
}

export interface Session {
  id: string;
  doctor: Doctor;
  patient: Patient;
  startTime: string;
  endTime: string;
  status: "scheduled" | "completed" | "cancelled";
}
