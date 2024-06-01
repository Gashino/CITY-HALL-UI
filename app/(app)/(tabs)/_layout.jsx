import { Tabs } from "expo-router";
import React from "react";
import { AuthProvider } from "../../../context/auth";
import AddButton from "../../../components/ButtonPlus";

const AppTabs = () => {
  return (
    <AuthProvider>
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="inicio"></Tabs.Screen>
        <Tabs.Screen name="reclamos"></Tabs.Screen>
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
        <Tabs.Screen name="denuncias"></Tabs.Screen>
        <Tabs.Screen name="perfil"></Tabs.Screen>
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
