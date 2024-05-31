import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { forgotPassword } from "../../../services/userService";

const ForgotPasswordPage = () => {
  const [mail, setMail] = useState("");

  const handleSubmit = () => {
    forgotPassword(mail);
  };

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
          onChangeText={(text) => setMail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
            router.navigate({
              pathname: "login/confirmationPassword",
              params: { email: mail },
            });
          }}
        >
          <Text style={styles.buttonText}>ENVIAR</Text>
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
    flexDirection: "column",
    paddingTop: 300,
  },
  logo: {
    width: 240,
    height: 240,
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
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ForgotPasswordPage;
