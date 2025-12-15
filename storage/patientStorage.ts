import { Patient, Session } from "@/models/allModels";
import { storage } from "./asyncStorage";

const PATIENTS_KEY = "patients";
const SESSIONS_KEY = "sessions";

export const savePatients = async (patients: Patient[]) => {
  await storage.set(PATIENTS_KEY, patients);
};

export const getPatients = async (): Promise<Patient[]> => {
  return storage.get<Patient[]>(PATIENTS_KEY, []);
};

export const getSessions = async (): Promise<Session[]> => {
  return storage.get<Session[]>(SESSIONS_KEY, []);
};

export const getPatient = async (
  patientId: string
): Promise<Patient | undefined> => {
  const patients = await getPatients();
  return patients.find((s) => s.id === patientId);
};

export const addPatient = async (patient: Patient) => {
  const patients = await getPatients();
  await savePatients([...patients, patient]);
};

export const saveSessions = async (sessions: Session[]) => {
  await storage.set(SESSIONS_KEY, sessions);
};

export const getSessionsByPatient = async (
  patientId: string
): Promise<Session[]> => {
  const sessions = await storage.get<Session[]>(SESSIONS_KEY, []);
  return sessions.filter((s) => s.patientId === patientId);
};
