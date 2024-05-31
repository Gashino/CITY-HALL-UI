import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import { loginUser } from "../../../services/userService";

const Login = () => {
  const [accces, setAcces] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await loginUser(accces, password);
    if (result !== null) {
      router.replace("/inicio");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setAcces(text);
          }}
        />
        <Text style={styles.label}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            router.navigate("login/forgotpassword");
          }}
        >
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.navigate("login/register");
          }}
        >
          <Text style={styles.registrarme}>-Registrarse-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#eff0ed",
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    height: 400,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  forgotPassword: {
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    height: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 80,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registrarme: {
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
});

export default Login;
