import { AuthContext, AuthProvider } from "@/utils/authContext";
import { Stack } from "expo-router";
import { useContext } from "react";

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const authState = useContext(AuthContext);
  const { isLoggedIn, isReady } = authState;

  if (!isReady) return null;

  return (
    <Stack>
      <Stack.Protected guard={!!isLoggedIn}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
