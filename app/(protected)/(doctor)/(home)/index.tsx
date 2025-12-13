import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useGetPatientsQuery } from "./_doctorQueries";

export default function Index() {
  const { data, isLoading } = useGetPatientsQuery();

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
        renderItem={({ item }) => {
          return <Text>{item.firstName}</Text>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
