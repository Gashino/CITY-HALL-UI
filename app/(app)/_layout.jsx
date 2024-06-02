import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      <Stack.Screen name="(tabs)"></Stack.Screen>
      <Stack.Screen name="(logintabs)"></Stack.Screen>
    </Stack>
  );
};

export default AppLayout;
