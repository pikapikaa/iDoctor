import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetPatientQuery } from "../(doctor)/(home)/_doctorQueries";

const PatientScreen = () => {
  const { id } = useLocalSearchParams();
  const { data } = useGetPatientQuery(`${id}`);

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
