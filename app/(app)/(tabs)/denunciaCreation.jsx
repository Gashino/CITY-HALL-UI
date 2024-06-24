import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateDenunciaCard from "../../../components/CreateDenunciaCard";
import { useAuth } from "../../../context/auth";

const DenunciaCreationPage = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      {!user.isAdmin ? (
        <CreateDenunciaCard></CreateDenunciaCard>
      ) : (
        <Text style={{ fontWeight: "bold" }}>No puedes crear denuncias.</Text>
      )}
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
