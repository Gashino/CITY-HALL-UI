import { Chip, Dialog } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { getImage } from "../services/formDataService";
import Carousel from "react-native-reanimated-carousel";
import { ScrollView } from "react-native";

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
    case "RECHAZADO":
      return "#c47237";
    default:
      return "#85929E";
  }
};

export default CardReclamo = ({ reclamo }) => {
  const [visible1, setVisible1] = useState(false);

  toggleDialog = () => {
    setVisible1(!visible1);
  };
  return (
    <Pressable onPress={toggleDialog}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri:
                  reclamo.images.length > 0
                    ? getImage(reclamo.images[0])
                    : "https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png",
              }}
              style={styles.image}
            ></Image>
            <View style={styles.details}>
              <View style={styles.headerMain}>
                <Text style={styles.headerText}>ID #{reclamo.id}</Text>
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
      <Dialog
        isVisible={visible1}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          ...styles.dialog,
          backgroundColor: getColorByStatus(reclamo.estado),
        }}
        animationType="slide"
      >
        <Dialog.Title
          titleStyle={{ textAlign: "center" }}
          title={
            <Text>
              Reclamo #{reclamo.id} - {reclamo.estado}
            </Text>
          }
        />
        <ScrollView>
          <Text
            style={{
              textAlign: "center",
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 10,
            }}
          >
            {reclamo.descripcion}
          </Text>
          <Text style={{ alignSelf: "center", paddingTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>Emisor: </Text>
            {reclamo.userdni}
          </Text>
          <Text style={{ alignSelf: "center", paddingTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}> Lugar: </Text>
            {reclamo.site}
          </Text>
          <Text style={{ alignSelf: "center", paddingTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}> Desperfecto: </Text>
            {reclamo.flaw}
          </Text>
          {reclamo.images.length === 0 ? (
            <Text
              style={{
                fontWeight: "800",
                alignSelf: "center",
                paddingTop: 50,
              }}
            >
              No hay imagenes para mostrar
            </Text>
          ) : (
            <Carousel
              autoPlay={reclamo.images.length === 1 ? false : true}
              autoPlayInterval={3000}
              width={300}
              height={500}
              style={{ alignSelf: "center", marginTop: 20 }}
              data={reclamo.images}
              scrollAnimationDuration={750}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: getImage(item),
                    }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                  ></Image>
                </View>
              )}
            />
          )}
          {reclamo.movements.length > 0 ? (
            <>
              <Text
                style={{
                  alignSelf: "center",
                  paddingTop: 20,
                  fontWeight: "bold",
                }}
              >
                Historial de movimientos
              </Text>
              {reclamo.movements.map((mov, index) => (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 8,
                    marginTop: 5,
                  }}
                >
                  <Text style={{ alignSelf: "center" }}>
                    ID: {mov.idMovement} - Causa: {mov.cause} - Responsable:{" "}
                    {mov.responsible} - Fecha: {mov.date.substring(0, 10)}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text
              style={{ alignSelf: "center", paddingTop: 60, fontWeight: "800" }}
            >
              No hay movimientos para este reclamo
            </Text>
          )}
        </ScrollView>
      </Dialog>
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
  dialog: {
    borderRadius: 15,
    padding: 10,
    height: "60%",
    width: "90%",
  },
});
