import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Fragment } from "react";

export default function RootLayout() {
  return (
    <Fragment>
      <Tabs screenOptions={{ tabBarActiveTintColor: "green" }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Patients",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-sharp" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sessions"
          options={{
            title: "Sessions",
            tabBarLabel: "Sessions",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </Fragment>
  );
}
