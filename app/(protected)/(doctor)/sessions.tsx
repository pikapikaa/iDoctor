import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  useGetPatientsQuery,
  useGetSessionsQuery,
} from "./(home)/_doctorQueries";

export default function SessionsScreen() {
  const { data: sessions, refetch, isRefetching } = useGetSessionsQuery();
  const { data: patientsData } = useGetPatientsQuery();

  const patientMap = useMemo(() => {
    return new Map(patientsData?.map((p) => [p.id, p]));
  }, [patientsData]);

  const sessionsWithPatient = useMemo(() => {
    return sessions?.map((session) => ({
      ...session,
      patient: patientMap.get(session.patientId),
    }));
  }, [sessions, patientMap]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.renderItem} key={item.id}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {item.scheduledAt}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {item.patient.lastName} {item.patient.firstName}
          </Text>
          <Text style={{ fontSize: 16 }}>{item.patient.birthDate}</Text>
        </View>
      </View>
    ),
    []
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ rowGap: 10, padding: 16 }}
      data={sessionsWithPatient}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text
            style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold" }]}
          >
            No sessions.
          </Text>
        </View>
      )}
      renderItem={renderItem}
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  );
}

const styles = StyleSheet.create({
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    gap: 20,
    padding: 10,
  },
  emptyContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: "center",
  },
});
