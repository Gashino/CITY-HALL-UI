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
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            padding: 15,
            minHeight: 50,
          },
        }}
      >
        <Tabs.Screen
          name="inicio"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={35}></Ionicons>
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
            tabBarActiveTintColor: "#1d3552",
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="reclamos"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="build-outline" color={color} size={35}></Ionicons>
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
            tabBarActiveTintColor: "#1d3552",
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
                size={35}
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
            tabBarActiveTintColor: "#1d3552",
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="perfil"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                color={color}
                size={35}
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
            tabBarActiveTintColor: "#1d3552",
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
        <Tabs.Screen name="servicioCreation" options={{ href: null }} />
      </Tabs>
    </AuthProvider>
  );
};
export default AppTabs;
