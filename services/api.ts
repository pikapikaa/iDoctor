import { Patient, Session } from "@/models/allModels";
import { getSessions, saveSessions } from "@/storage/patientStorage";
import { formatDate, formatFullDate } from "@/utils/functions";

export const fetchPatientsFromApi = async (): Promise<Patient[]> => {
  const res = await fetch("https://dummyjson.com/users");
  const json = await res.json();

  return json.users.map((u: any) => ({
    id: String(u.id),
    firstName: u.firstName,
    lastName: u.lastName,
    age: u.age,
    birthDate: formatDate(u.birthDate),
    image: u.image,
  }));
};

export const createSession = async (
  doctorId: string,
  patientId: string,
  date: Date
): Promise<Session> => {
  const newSession: Session = {
    id: Date.now().toString(),
    doctorId,
    patientId,
    scheduledAt: date.toString(),
    scheduledAtNormalize: formatFullDate(date),
    status: "scheduled",
  };

  const sessions = await getSessions();
  await saveSessions([...sessions, newSession]);

  return newSession;
};
