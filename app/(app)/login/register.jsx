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
import { registerUser } from "../../../services/userService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [responseCode, setResponseCode] = useState(0);

  const handleSubmit = () => {
    setResponseCode(0);
    registerUser(email, dni, setResponseCode);
  };

  useEffect(() => {
    if (responseCode === 0) return;
    if (responseCode === 201) {
      router.navigate({
        pathname: "login/confirmationRegister",
        params: { email: email },
      });
    } else if (responseCode === 409) {
      setResponseCode(0);
      Alert.alert("Error", "Usuario ya registrado");
    } else if (responseCode === 400) {
      Alert.alert("Error", "No es un vecino. Contacte a la municipalidad");
    }
  }, [responseCode]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        f
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>DOCUMENTO-DNI</Text>
        <TextInput
          style={styles.input}
          placeholder="Documento-DNI"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setDni(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>REGISTRARSE</Text>
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
  button: {
    height: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 200,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterPage;
