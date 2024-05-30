import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const AppTabs = () => {
  return (
    <Tabs screenOptions={{headerShown:true}}>
      <Tabs.Screen name='inicio'></Tabs.Screen>
      <Tabs.Screen name='reclamos'></Tabs.Screen>
      <Tabs.Screen name='denuncias'></Tabs.Screen>
      <Tabs.Screen name='perfil'></Tabs.Screen>
    </Tabs>
  );
};

export default AppTabs;