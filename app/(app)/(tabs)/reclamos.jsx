import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CardReclamo from "../../../components/ReclamoCard";
import { getReclamos } from "../../../services/reclamosService";
import { useFocusEffect } from "expo-router";
import { Switch, Text } from "@rneui/base";
import { useAuth } from "../../../context/auth";

const ReclamosPage = () => {
  const { user } = useAuth();
  const [reclamos, setReclamos] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setisLoading(true);
      getReclamos().then((data) => {
        let reclamosArray = data.map((reclamo) => {
          return {
            id: reclamo.idClaim,
            estado: reclamo.status,
            creador: reclamo.user.email,
            responsable: reclamo.employee,
            descripcion: reclamo.description,
            userdni: reclamo.user.document,
          };
        });

        checked
          ? (reclamosArray = reclamosArray.filter(
              (reclamo) => reclamo.userdni === user.document
            ))
          : null;
        setReclamos(reclamosArray);
        setisLoading(false);
      });
    }, [checked])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          paddingBottom: 10,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch value={checked} onValueChange={(value) => setChecked(value)} />
        <Text style={{ fontWeight: "600", paddingLeft: 5 }}>
          Mostrar solo mis reclamos
        </Text>
      </View>

      <ScrollView style={{ width: "100%", flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            color={"#000"}
            size={"large"}
            style={{ flex: 1, justifyContent: "center", paddingTop: 350 }}
          />
        ) : reclamos.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 350 }}>
            <Text style={{ fontWeight: "bold" }}>
              No hay reclamos para mostrar.
            </Text>
          </View>
        ) : (
          reclamos.map((reclamo) => (
            <CardReclamo key={reclamo.id} reclamo={reclamo} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6c2d1",
  },
});

export default ReclamosPage;
