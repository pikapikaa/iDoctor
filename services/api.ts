import { Patient } from "@/models/allModels";

export const fetchPatientsFromApi = async (): Promise<Patient[]> => {
  const res = await fetch("https://dummyjson.com/users");
  const json = await res.json();

  return json.users.map((u: any) => ({
    id: String(u.id),
    firstName: u.firstName,
    lastName: u.lalastName,
    age: u.age,
    birthDate: u.birthDate,
    image: u.image,
  }));
};
