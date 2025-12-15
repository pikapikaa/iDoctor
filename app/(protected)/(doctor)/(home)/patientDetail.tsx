import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useGetPatientQuery, useGetSessionQuery } from "./_doctorQueries";

interface DetailParams {
  id?: string;
}

const PatientDetailScreen = () => {
  const { id } = useLocalSearchParams() as DetailParams;
  const { data } = useGetPatientQuery(id);
  const { data: sessionData } = useGetSessionQuery(id);

  const { lastName, firstName, birthDate } = data || {};

  if (data) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: data?.image }} style={styles.image} />

          <View style={{ flex: 1, gap: 10 }}>
            <Text style={styles.title}>{`${lastName} ${firstName}`}</Text>
            <Text style={{ fontSize: 25 }}>{`${birthDate}`}</Text>

            {sessionData?.length ? <Text>sessions this</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <Pressable style={[styles.buttonContainer]} onPress={() => {}}>
            <Text style={styles.buttonText}>Schedule Session</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

export default PatientDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  buttonContainer: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
