// app/_layout.jsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown:true}}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}