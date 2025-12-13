import { AuthContext } from "@/utils/authContext";
import { Redirect } from "expo-router";
import { useContext } from "react";

export default function Index() {
  const authState = useContext(AuthContext);
  const { login } = authState;

  if (login === "doctor") {
    return <Redirect href="/(protected)/(tabs)/(home)" />;
  }

  return <Redirect href="/(protected)/(patient)" />;
}
