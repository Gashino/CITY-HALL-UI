import { Tabs } from "expo-router";
import React from "react";
import { AuthProvider } from "../../../context/auth";
const AppTabs = () => {
  return (
    <AuthProvider>
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="inicio"></Tabs.Screen>
        <Tabs.Screen name="reclamos"></Tabs.Screen>
        <Tabs.Screen name="denuncias"></Tabs.Screen>
        <Tabs.Screen name="perfil"></Tabs.Screen>
      </Tabs>
    </AuthProvider>
  );
};

export default AppTabs;
