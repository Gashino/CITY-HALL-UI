import { Stack, router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const LoginScreens = () => {
  return (
    <Stack>
      <Stack.Screen name="confirmationPassword" />
      <Stack.Screen name="confirmationRegister" />

      <Stack.Screen
        name="forgotpassword"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.navigate("/login")}>
              <Text style={styles.loginbutton}>{"< Login"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.navigate("/login")}>
              <Text style={styles.loginbutton}>{"< Login"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  loginbutton: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default LoginScreens;
