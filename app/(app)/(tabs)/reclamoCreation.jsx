import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import CreateReclamoCard from "../../../components/CreateReclamoCard";

const ReclamoCreationPage = () => {
  return (
    <View style={styles.container}>
      <CreateReclamoCard></CreateReclamoCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full height of the screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});
export default ReclamoCreationPage;
