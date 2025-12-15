import { Patient, Session } from "@/models/allModels";
import { fetchPatientsFromApi } from "@/services/api";
import {
  getPatient,
  getPatients,
  getSessionsByPatient,
  savePatients,
} from "@/storage/patientStorage";
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

export const useGetPatientQuery = (id?: string) => {
  return useQuery<Patient | undefined>({
    queryKey: ["patient", id],
    queryFn: () => getPatient(id!),
    enabled: Boolean(id),
  });
};

export const useGetSessionQuery = (id?: string) => {
  return useQuery<Session[] | undefined>({
    queryKey: ["session", id],
    queryFn: () => getSessionsByPatient(id!),
    enabled: Boolean(id),
  });
};
