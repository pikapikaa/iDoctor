import { Patient } from "@/models/allModels";
import { fetchPatientsFromApi } from "@/services/api";
import { getPatients, savePatients } from "@/storage/patientStorage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetPatientsQuery = (
  options?: UseQueryOptions<Patient[], Error, Patient[]>
) => {
  return useQuery<Patient[], Error, Patient[]>({
    queryKey: ["patients"],
    staleTime: 0,
    gcTime: 0,
    queryFn: async (): Promise<Patient[]> => {
      const local = await getPatients();
      if (local.length) return local;

      const remote = await fetchPatientsFromApi();
      savePatients(remote);
      return remote;
    },
    placeholderData: [],
    ...options,
  });
};
