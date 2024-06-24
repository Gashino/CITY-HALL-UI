import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { getImage } from "../services/formDataService";

export default CardServicio = ({ servicio, rubro }) => {
  const ProfesionalService = () => {
    return (
      <View style={[styles.card, styles.profesionalCard]}>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri:
                servicio.images.length > 0
                  ? getImage(servicio.images[0])
                  : "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png",
            }}
            style={styles.image}
            resizeMode="cover"
          ></Image>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.headerTitle}>{servicio.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="people-circle-outline" size={18}></Ionicons>
              <Text style={styles.headerNombre}>
                {servicio.name} {servicio.surname}
              </Text>
            </View>
          </View>
          <View style={styles.profesionalContainer}>
            <View style={styles.description}>
              <Text>{servicio.description}</Text>
            </View>
            <View style={styles.infoProfesional}>
              <Text style={{ fontSize: 11 }}>Horario</Text>
              <Text style={{ fontSize: 10, fontWeight: "500" }}>
                {servicio.hours}
              </Text>
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 12,
                  width: "100%",
                  padding: 2,
                  marginLeft: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Ionicons
                  name="pricetags-outline"
                  color={"white"}
                  style={{ marginRight: 5 }}
                ></Ionicons>
                <View style={{ width: "80%", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "white",
                    }}
                  >
                    {rubro}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Ionicons
            name="information-circle-outline"
            style={{ alignSelf: "flex-start", paddingTop: 8 }}
            size={20}
          ></Ionicons>
        </View>
      </View>
    );
  };

  const NormalService = () => {
    return (
      <View style={[styles.card, styles.normalCard]}>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri:
                servicio.images.length > 0
                  ? getImage(servicio.images[0])
                  : "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png",
            }}
            style={styles.image}
            resizeMode="cover"
          ></Image>
          <Text style={styles.headerTitle}>{servicio.title}</Text>
          <View style={styles.description}>
            <Text>{servicio.description}</Text>
          </View>
          <Ionicons
            name="information-circle-outline"
            style={{ alignSelf: "flex-start", paddingTop: 8 }}
            size={20}
          ></Ionicons>
        </View>
      </View>
    );
  };

  return (
    <Pressable>
      <View style={styles.container}>
        {servicio.profesional ? ProfesionalService() : NormalService()}
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
    height: 280,
    width: "90%",
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
  profesionalCard: { backgroundColor: "#b5b2b2" },
  normalCard: { backgroundColor: "white" },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#D5D8DC",
  },

  description: {
    flex: 1,
    padding: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    minHeight: 70,
    maxHeight: 70,
    width: "100%",
  },
  headerTitle: { fontWeight: "700", paddingVertical: 4 },
  headerNombre: {
    fontWeight: "400",
    paddingVertical: 4,
    marginLeft: 3,
  },
  profesionalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoProfesional: {
    width: "35%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
  },
});
