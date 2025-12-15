import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AuthContext, User } from "@/utils/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export const users: User[] = [
  { id: 2, name: "Doctor", role: "doctor" },
  { id: 1, name: "Patient (Johnson Emily)", role: "patient" },
];

const LoginScreen = () => {
  const authState = useContext(AuthContext);
  const { logIn } = authState;

  const [selected, setSelected] = useState<User>(users[0]);

  const onSumbitHandler = () => {
    if (!selected) return;
    logIn(selected);
  };

  const disabled = !selected;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Login</Text>
        <View style={{ gap: 15 }}>
          {users.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                setSelected(item);
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons
                name={`radio-button-${selected.id === item.id ? "on" : "off"}`}
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ gap: 10 }}>
          <Pressable
            style={[styles.buttonContainer, { opacity: disabled ? 0.4 : 1 }]}
            onPress={onSumbitHandler}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>signin</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1, backgroundColor: "white" },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  buttonContainer: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  input: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    fontSize: 16,
    color: "#111827",
    width: 200,
  },
});
