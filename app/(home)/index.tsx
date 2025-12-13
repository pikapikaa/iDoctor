import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>main</Text>
      <Link href="/(home)/patientDetail" push asChild>
        <Button title="go to patient info" />
      </Link>
    </View>
  );
}
