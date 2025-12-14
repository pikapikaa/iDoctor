import { fetchPatientsFromApi } from "@/services/api";
import { getPatients, savePatients } from "@/storage/patientStorage";
import { Slot } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  // fill db by data
  useEffect(() => {
    const fill = async () => {
      const patients = await getPatients();
      if (!patients.length) {
        const remote = await fetchPatientsFromApi();
        await savePatients(remote);
      }
    };
    fill();
  }, []);

  return <Slot />;
}
