import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default CardServicio = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>SERVICIO EJEMPLO</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    height: 140,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  details: {
    height: "100%",
    width: "90%",
    padding: 5,
    flexDirection: "column",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 3,
  },
  chip: {
    minWidth: 85,
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginTop: 6,
  },
  descripcion: {
    padding: 5,
    borderColor: "black",
    borderWidth: 0.3,
    borderRadius: 10,
    minHeight: 70,
    maxHeight: 70,
    marginTop: 6,
  },
  moreInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 20,
    alignItems: "center",
    marginTop: 5,
  },
  dialog: {
    borderRadius: 15,
    padding: 10,
  },
});
