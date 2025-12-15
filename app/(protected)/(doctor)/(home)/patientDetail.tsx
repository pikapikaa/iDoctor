import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

import { queryClient } from "@/app/_layout";
import { createSession } from "@/services/api";
import { useGetPatientQuery, useGetSessionQuery } from "./_doctorQueries";

interface DetailParams {
  id?: string;
}

const PatientDetailScreen = () => {
  const { id } = useLocalSearchParams() as DetailParams;
  const { data } = useGetPatientQuery(id);
  const { data: sessionData, refetch } = useGetSessionQuery(id);

  const { lastName, firstName, birthDate } = data || {};

  const onScheduleHandler = async () => {
    const doctorId = "1";
    const patientId = `${id}`;
    await createSession(doctorId, patientId, new Date());
    queryClient.refetchQueries({
      queryKey: ["sessions"],
    });
    refetch();
    if (Platform.OS === "android") {
      ToastAndroid.show("Session scheduled!", ToastAndroid.TOP);
    } else {
      Alert.alert("Session scheduled!");
    }
  };

  if (data) {
    return (
      <View style={{ flex: 1 }}>
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
        <View style={styles.bottomButtonContainer}>
          <Pressable
            style={[styles.buttonContainer]}
            onPress={onScheduleHandler}
          >
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
  sessionTitle: {
    fontWeight: "700",
    fontSize: 20,
  },
});
