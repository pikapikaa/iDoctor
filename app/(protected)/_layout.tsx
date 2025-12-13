import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

import { AuthContext } from "@/utils/authContext";

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);
  const { isLoggedIn, isReady } = authState;

  if (!isReady) return null;

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
