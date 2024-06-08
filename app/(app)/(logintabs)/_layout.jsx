import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

const TabLogin = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          padding: 15,
          minHeight: 50,
        },
      }}
    >
      <Tabs.Screen
        name="servicios"
        options={{
          title: "Servicios",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                color,
              }}
            >
              Servicios
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-outline" color={color} size={35} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                color,
                marginLeft: 10,
              }}
            >
              Login
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={color} size={35} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLogin;
