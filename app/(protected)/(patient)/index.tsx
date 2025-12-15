import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  useGetPatientQuery,
  useGetSessionQuery,
} from "../(doctor)/(home)/_doctorQueries";

const PatientScreen = () => {
  const { id } = useLocalSearchParams();
  const { data } = useGetPatientQuery(`${id}`);
  const { data: sessionData } = useGetSessionQuery(`${id}`);

  const { lastName, firstName, birthDate } = data || {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: data?.image }} style={styles.image} />

        <View style={{ flex: 1, gap: 10 }}>
          <Text style={styles.title}>{`${lastName} ${firstName}`}</Text>
          <Text style={{ fontSize: 25 }}>{`${birthDate}`}</Text>

          {sessionData?.length ? (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.sessionTitle}>List of Sessions:</Text>
              {sessionData.map((session, index) => (
                <View key={session.id} style={{ gap: 10 }}>
                  <Text style={{ fontSize: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {`${index + 1})`}{" "}
                    </Text>
                    {session.scheduledAt}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
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
  sessionTitle: {
    fontWeight: "700",
    fontSize: 20,
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
});
