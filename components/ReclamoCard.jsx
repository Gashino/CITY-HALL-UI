import { Divider } from "@rneui/base";
import { Chip } from "@rneui/themed";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const img = require("../assets/images/gotera.png");

const getColorByStatus = (status) => {
  switch (status) {
    case "CERRADO":
      return "#E74C3C";
    case "EN_PROCESO":
      return "#5DADE2";
    case "RESUELTO":
      return "#58D68D";
    case "PENDIENTE":
      return "#F5B041";
    default:
      return "#85929E";
  }
};

export default CardReclamo = ({ reclamo }) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
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
  container: { justifyContent: "center", alignItems: "center", marginTop: 10 },
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
    marginBottom: 10,
  },
  image: {
    width: "30%",
    height: 140,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#D5D8DC",
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
    padding: 5,
    borderColor: "black",
    borderWidth: 0.2,
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
