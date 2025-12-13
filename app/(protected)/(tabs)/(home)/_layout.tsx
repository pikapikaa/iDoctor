import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Patients" }} />
      <Stack.Screen name="patientDetail" options={{ title: "Patient Info" }} />
    </Stack>
  );
}
