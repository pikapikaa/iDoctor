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
  doctorId: string;
  patientId: string;
  scheduledAt: string; // ISO date
  status: "scheduled" | "completed" | "cancelled";
}
