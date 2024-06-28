import { Chip, Dialog } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/auth";
import Carousel from "react-native-reanimated-carousel";
import { getImage } from "../services/formDataService";

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

export default CardDenuncia = ({ denuncia }) => {
  const { user } = useAuth();
  const [visible1, setVisible1] = useState(false);

  toggleDialog = () => {
    setVisible1(!visible1);
  };

  const getColorDniDenounced = (dni) => {
    return dni === user.document ? "red" : "black";
  };

  const color = getColorDniDenounced(denuncia.documentDenounced);

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
            <View style={styles.details}>
              <View style={styles.headerMain}>
                <Text style={styles.headerText}>
                  ID #{denuncia.idComplaint}
                </Text>
                <Chip
                  color={getColorByStatus(denuncia.status)}
                  containerStyle={styles.chip}
                >
                  {denuncia.status}
                </Chip>
              </View>
              <View style={styles.descripcion}>
                <Text>{denuncia.description}</Text>
              </View>
              <View style={styles.moreInfo}>
                {denuncia.siteStreet ? (
                  <Text style={{ fontWeight: "500" }}>
                    Sitio: {denuncia.siteStreet} {denuncia.siteNumber}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontWeight: "500",
                      color: color,
                    }}
                  >
                    Denunciado: {denuncia.documentDenounced}{" "}
                    {color === "red" ? " (Tú)" : ""}
                  </Text>
                )}
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
          backgroundColor: getColorByStatus(denuncia.status),
        }}
        animationType="slide"
      >
        <Dialog.Title
          titleStyle={{ textAlign: "center" }}
          title={
            <Text>
              Denuncia #{denuncia.idComplaint} - {denuncia.status}
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
            {denuncia.description}
          </Text>
          <Text style={{ alignSelf: "center", paddingTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>Denunciado: </Text>
            {denuncia.documentDenounced
              ? denuncia.documentDenounced
              : denuncia.siteStreet + " " + denuncia.siteNumber}
          </Text>
          {denuncia.images.length === 0 ? (
            <Text
              style={{
                fontWeight: "800",
                alignSelf: "center",
                paddingTop: 50,
              }}
            >
              No hay imágenes para mostrar
            </Text>
          ) : (
            <Carousel
              autoPlay={denuncia.images.length === 1 ? false : true}
              autoPlayInterval={3000}
              width={300}
              height={500}
              style={{ alignSelf: "center", marginTop: 20 }}
              data={denuncia.images}
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
                  />
                </View>
              )}
            />
          )}
          {denuncia.movements.length > 0 ? (
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
              {denuncia.movements.map((mov, index) => (
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
              No hay movimientos para esta denuncia
            </Text>
          )}
        </ScrollView>
      </Dialog>
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
    height: 160,
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
    justifyContent: "space-between",
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
    height: "60%",
    width: "90%",
  },
});
