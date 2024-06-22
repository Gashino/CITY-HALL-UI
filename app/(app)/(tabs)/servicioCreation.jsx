import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CreateServicioCard from "../../../components/CreateServicioCard";

const ServicioCreationPage = () => {
  const { tipo } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <CreateServicioCard tipo={tipo} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ServicioCreationPage;
