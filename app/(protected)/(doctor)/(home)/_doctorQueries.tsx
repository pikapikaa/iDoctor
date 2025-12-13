import { Patient } from "@/models/allModels";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

interface PatientsResponse {
  users: Patient[];
  total: number;
  skip: number;
  limit: number;
}

export const useGetPatientsQuery = (
  options?: UseQueryOptions<Patient[], Error, Patient[]>
) => {
  return useQuery<Patient[], Error, Patient[]>({
    queryKey: ["patients"],
    staleTime: 0,
    gcTime: 0,
    queryFn: async (): Promise<Patient[]> => {
      const response = await axios.get<PatientsResponse>(
        "https://dummyjson.com/users"
      );
      return response.data.users;
    },
    placeholderData: [],
    ...options,
  });
};
