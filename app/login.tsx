import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AuthContext } from "@/utils/authContext";

const LoginScreen = () => {
  const authState = useContext(AuthContext);
  const { logIn } = authState;

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
        <TextInput
          placeholder="Enter your login"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
        <View style={{ gap: 10 }}>
          <Pressable style={styles.buttonContainer} onPress={logIn}>
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
