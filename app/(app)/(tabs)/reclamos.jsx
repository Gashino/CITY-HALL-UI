import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CardReclamo from "../../../components/ReclamoCard";
import { getReclamos } from "../../../services/reclamosService";
import { useFocusEffect } from "expo-router";

const ReclamosPage = () => {
  const [reclamos, setReclamos] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
          };
        });
        setReclamos(reclamosArray);
        setisLoading(false);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
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
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReclamosPage;
