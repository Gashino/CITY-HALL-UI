import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { AuthProvider } from "../../../context/auth";

const TabLogin = () => {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingBottom: 10 },
        }}
      >
        <Tabs.Screen
          name="servicios"
          options={{
            title: "Servicios",
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ fontWeight: focused ? "bold" : "normal", color }}>
                Servicios
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bag-outline" color={color} size={32} />
            ),
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ fontWeight: focused ? "bold" : "normal", color }}>
                Login
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={32} />
            ),
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default TabLogin;
