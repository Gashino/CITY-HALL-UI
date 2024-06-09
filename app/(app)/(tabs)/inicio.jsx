import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import CardServicio from "../../../components/ServiciosCard";

const InicioPage = () => {
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

export default InicioPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6c2d1",
  },
});
