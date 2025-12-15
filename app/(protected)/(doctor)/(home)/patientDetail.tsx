import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
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
import { AuthContext } from "@/utils/authContext";
import {
  useCreateSessionMutation,
  useGetPatientQuery,
  useGetSessionQuery,
  useGetSessionsQuery,
} from "../_doctorQueries";

interface DetailParams {
  id?: string;
}

const PatientDetailScreen = () => {
  const { id } = useLocalSearchParams() as DetailParams;
  const { data } = useGetPatientQuery(id);
  const { data: sessionData, refetch } = useGetSessionQuery(id);
  const { data: allSessions } = useGetSessionsQuery();

  const { mutate: createSession, isPending } = useCreateSessionMutation();

  const authState = useContext(AuthContext);
  const { user } = authState;

  const { lastName, firstName, birthDate } = data || {};

  const formatDateKey = (dateInput: string | Date) => {
    let dateObj;

    if (typeof dateInput === "string") {
      dateObj = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      dateObj = dateInput;
    } else {
      throw new Error("Invalid date input provided");
    }

    return dateObj.toISOString().split("T")[0];
  };

  const addUniqueDate = () => {
    const existingDateKeys = new Set(
      allSessions?.map((item) => item.scheduledAt).map(formatDateKey)
    );

    let currentDate = new Date();
    let currentKey = formatDateKey(currentDate);

    while (existingDateKeys.has(currentKey)) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentKey = formatDateKey(currentDate);
    }

    return currentDate;
  };

  const onScheduleHandler = async () => {
    const patientId = `${id}`;
    const date = addUniqueDate();
    createSession(
      { doctorId: `${user?.id}`, patientId, date },
      {
        onSuccess: () => {
          refetch();
          queryClient.refetchQueries({
            queryKey: ["sessions"],
          });

          if (Platform.OS === "android") {
            ToastAndroid.show("Session scheduled!", ToastAndroid.TOP);
          } else {
            Alert.alert("Session scheduled!");
          }
        },
        onError: (error) => {
          console.log(error);
          if (Platform.OS === "android") {
            ToastAndroid.show("Error.", ToastAndroid.TOP);
          } else {
            Alert.alert("Error.");
          }
        },
      }
    );
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
                      {session.scheduledAtNormalize}
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
            disabled={isPending}
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
