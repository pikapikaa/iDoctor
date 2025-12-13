import { Link } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

import { AuthContext } from "@/utils/authContext";

export default function Index() {
  const authState = useContext(AuthContext);
  const { logOut } = authState;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>main</Text>
      <Link href="/patientDetail" push asChild>
        <Button title="go to patient info" />
      </Link>

      <Button title="logout" onPress={logOut} />
    </View>
  );
}
