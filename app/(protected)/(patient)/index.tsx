import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "@/utils/authContext";

const PatientScreen = () => {
  const authState = useContext(AuthContext);
  const { logOut } = authState;

  return (
    <View style={styles.container}>
      <Text>Patient Screen</Text>
      <Button title="logout" onPress={logOut} />
    </View>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    gap: 30,
  },
});
