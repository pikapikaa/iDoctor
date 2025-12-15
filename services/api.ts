import { Patient } from "@/models/allModels";
import { formatDate } from "@/utils/functions";

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
