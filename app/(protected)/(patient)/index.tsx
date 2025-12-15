import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PatientScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Patient Screen</Text>
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
