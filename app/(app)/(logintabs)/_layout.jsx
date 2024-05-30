import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const TabLogin = () => {
  return (
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name='servicios' options={{title:"Servicios" }}></Tabs.Screen>
        <Tabs.Screen name='login' options={{title:"Login"}}></Tabs.Screen>
    </Tabs>
  );
};

export default TabLogin;