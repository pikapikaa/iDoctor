import { Patient, Session } from "@/models/allModels";
import { createSession, fetchPatientsFromApi } from "@/services/api";
import {
  getPatient,
  getPatients,
  getSessions,
  getSessionsByPatient,
  savePatients,
} from "@/storage/patientStorage";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

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

export const useGetSessionsQuery = (
  options?: UseQueryOptions<Session[], Error, Session[]>
) => {
  return useQuery<Session[], Error, Session[]>({
    queryKey: ["sessions"],
    staleTime: 0,
    gcTime: 0,
    queryFn: async (): Promise<Session[]> => {
      const local = await getSessions();
      if (local.length) return local;
      return [];
    },
    placeholderData: [],
    ...options,
  });
};

export const useCreateSessionMutation = () => {
  return useMutation({
    mutationKey: ["create-session"],
    mutationFn: ({
      doctorId,
      patientId,
      date,
    }: {
      doctorId: string;
      patientId: string;
      date: Date;
    }) => createSession(doctorId, patientId, date),
  });
};
