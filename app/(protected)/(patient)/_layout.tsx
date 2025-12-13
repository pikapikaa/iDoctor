import { AuthContext } from "@/utils/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Pressable } from "react-native";

export default function Layout() {
  const authState = useContext(AuthContext);
  const { logOut } = authState;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <Pressable onPress={logOut}>
              <Ionicons name="exit-outline" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
