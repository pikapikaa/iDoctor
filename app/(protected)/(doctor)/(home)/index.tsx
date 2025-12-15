import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Patient } from "@/models/allModels";
import { useRouter } from "expo-router";
import { useGetPatientsQuery } from "../_doctorQueries";

const ITEM_HEIGHT = 105;

export default function Index() {
  const { data, isLoading, refetch, isRefetching } = useGetPatientsQuery();
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: Patient }) => (
      <Pressable
        style={styles.renderItem}
        key={item.id}
        onPress={() => {
          router.navigate(`/patientDetail?id=${item.id}`);
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        />
        <View>
          <Text style={styles.fio}>
            {item.lastName} {item.firstName}
          </Text>
          <Text style={styles.fio}>{item.birthDate}</Text>
        </View>
      </Pressable>
    ),
    []
  );

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10, padding: 16 }}
        onRefresh={refetch}
        refreshing={isRefetching}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    gap: 20,
  },
  fio: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
