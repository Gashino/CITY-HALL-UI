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
      Alert.alert("Error", "Usuario incorrecto o inactivo");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../../assets/appLogo.png")}
          style={styles.logo}
        />
      </View>
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
        <View>
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
        </View>
        <View style={{ paddingTop: 50 }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#eff0ed",
  },
  logo: {
    width: 400,
    height: 240,
  },
  inputContainer: {
    width: "100%",
    paddingTop: 30,
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
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registrarme: {
    color: "#007BFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Login;
