import { useContext } from "react";
import { Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

import { AuthContext } from "@/utils/authContext";
export default function Layout() {
  const authState = useContext(AuthContext);
  const { logOut } = authState;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Patients",
          headerRight: () => (
            <Pressable onPress={logOut}>
              <Ionicons name="exit-outline" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="patientDetail" options={{ title: "Patient Info" }} />
    </Stack>
  );
}
