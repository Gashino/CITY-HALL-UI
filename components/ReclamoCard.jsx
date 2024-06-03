import { Divider } from "@rneui/base";
import { Chip } from "@rneui/themed";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const img = require("../assets/images/gotera.png");

const getColorByStatus = (status) => {
  switch (status) {
    case "CERRADO":
      return "red";
    case "EN_PROCESO":
      return "blue";
    case "RESUELTO":
      return "green";
    case "PENDIENTE":
      return "#bf914b";
    default:
      return "grey";
  }
};

export default CardReclamo = ({ reclamo }) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Image source={img} style={styles.image}></Image>
            <View style={styles.details}>
              <View style={styles.headerMain}>
                <Text style={styles.headerText}>Reclamo # {reclamo.id}</Text>
                <Chip
                  containerStyle={styles.chip}
                  color={getColorByStatus(reclamo.estado)}
                >
                  {reclamo.estado}
                </Chip>
              </View>
              <View style={styles.descripcion}>
                <Text>{reclamo.descripcion}</Text>
              </View>
              <View style={styles.moreInfo}>
                <Text style={{ marginTop: 2, color: "purple" }}>
                  +Información
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  card: {
    height: 160,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "30%",
    height: 140,
    borderRadius: 15,
    borderColor: "#2d2033",
    borderWidth: 3,
  },
  details: {
    height: "100%",
    width: "70%",
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
    padding: 3,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    minHeight: 70,
    maxHeight: 70,
    marginTop: 6,
  },
  moreInfo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
    alignItems: "center",
    marginTop: 5,
  },
});
