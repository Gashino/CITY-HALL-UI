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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ReclamoCreationPage;
