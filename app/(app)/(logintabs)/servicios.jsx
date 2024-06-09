import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CardServicio from "../../../components/ServiciosCard";

const Servicios = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <CardServicio />
        <CardServicio />
        <CardServicio />
        <CardServicio />
        <CardServicio />
        <CardServicio />
        <CardServicio />
        <CardServicio />
      </ScrollView>
    </View>
  );
};

export default Servicios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6c2d1",
  },
});
