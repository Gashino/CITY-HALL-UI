import { Tabs } from "expo-router";
import React from "react";
import { AuthProvider } from "../../../context/auth";
import AddButton from "../../../components/ButtonPlus";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

const AppTabs = () => {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingBottom: 10 },
        }}
      >
        <Tabs.Screen
          name="inicio"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={32}></Ionicons>
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  color,
                  fontSize: "15",
                }}
              >
                Inicio
              </Text>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="reclamos"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="build-outline" color={color} size={32}></Ionicons>
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  color,
                  fontSize: "15",
                }}
              >
                Reclamos
              </Text>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="create"
          options={{
            tabBarLabel: "",
            tabBarIcon: () => <AddButton />,
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
            },
          })}
        />
        <Tabs.Screen
          name="denuncias"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="alert-circle-outline"
                color={color}
                size={32}
              ></Ionicons>
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  color,
                  fontSize: "15",
                }}
              >
                Denuncias
              </Text>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="perfil"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                color={color}
                size={32}
              ></Ionicons>
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  color: color,
                  fontSize: "15",
                }}
              >
                Perfil
              </Text>
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="denunciaCreation"
          options={{ href: null }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="reclamoCreation"
          options={{ href: null }}
        ></Tabs.Screen>
      </Tabs>
    </AuthProvider>
  );
};
export default AppTabs;
