import React from "react";
import { StyleSheet, View } from "react-native";
import CreateDenunciaCard from "../../../components/CreateDenunciaCard";

const DenunciaCreationPage = () => {
  return (
    <View style={styles.container}>
      <CreateDenunciaCard></CreateDenunciaCard>
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
export default DenunciaCreationPage;
