import { ScrollView, View } from "react-native";
import { Text } from "@rneui/base";
import { router, useLocalSearchParams } from "expo-router";
import { Link } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NotificacionesScreen() {
  const isPresented = router.canGoBack();
  const { notificaciones: notificacionesParam } = useLocalSearchParams();
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (notificacionesParam && typeof notificacionesParam === "string") {
      try {
        const notificacionesBien = JSON.parse(notificacionesParam);
        setNotificaciones(notificacionesBien);
      } catch (error) {
        console.error("Error parsing notificaciones:", error);
      }
    } else {
      setNotificaciones(notificacionesParam || []);
    }
  }, [notificacionesParam]);

  const Notificaciones = () => {
    return (
      <View>
        {notificaciones.map((notificacion, index) => (
          <View key={index}>
            <Notificacion notificacion={notificacion} />
          </View>
        ))}
      </View>
    );
  };

  const Notificacion = ({ notificacion }) => {
    return (
      <View
        style={{
          padding: 18,
          borderRadius: 10,
          borderWidth: 0.85,
          borderColor: "#000",
          marginTop: 15,
          height: 80,
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#86c3e5",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="notifications-circle-outline"
          size={40}
          color={"#4c4c4c"}
          style={{ marginRight: 10 }}
        ></Ionicons>
        <Text style={{ fontWeight: "500" }}>{notificacion.type} </Text>
        <Text>
          con
          <Text style={{ fontWeight: "500" }}>
            {" "}
            ID# {notificacion.idType}
          </Text>{" "}
          ha cambiado de <Text style={{ fontWeight: "500" }}>ESTADO</Text>
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 14,
        }}
      >
        ---- Notificaciones ----
      </Text>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        {notificaciones !== null && notificaciones.length > 0 ? (
          <Notificaciones />
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            No hay notificaciones para mostrar
          </Text>
        )}
      </ScrollView>
      {!isPresented && (
        <View style={{ padding: 10 }}>
          <Link href="../">Dismiss</Link>
        </View>
      )}
    </View>
  );
}
