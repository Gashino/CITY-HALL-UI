import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CardReclamo from "../../../components/ReclamoCard";
import {
  getReclamos,
  getReclamosByRubro,
} from "../../../services/reclamosService";
import { Switch, Text } from "@rneui/base";
import { useAuth } from "../../../context/auth";
import { RefreshControl } from "react-native";

const ReclamosPage = () => {
  const { user } = useAuth();
  const [reclamos, setReclamos] = useState([]);
  const [reclamosFiltrados, setReclamosFiltrados] = useState([]);
  const [checked, setChecked] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = user.isAdmin
        ? await getReclamosByRubro(user.category.categoryId)
        : await getReclamos();
      let reclamosArray = data.map((reclamo) => {
        return {
          id: reclamo.idClaim,
          estado: reclamo.status,
          creador: reclamo.user ? reclamo.user : reclamo.employee,
          descripcion: reclamo.description,
          userdni: reclamo.user
            ? reclamo.user.document
            : reclamo.employee.document,
          images: reclamo.images,
        };
      });
      setReclamos(reclamosArray);
      const reclamosFiltrados = reclamosArray.filter(
        (reclamo) => reclamo.userdni === user.document
      );
      setReclamosFiltrados(reclamosFiltrados);
      setRefresh(false);
    };
    fetchData();
  }, [refresh]);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 3500);
  }, []);

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

      <ScrollView
        style={{ width: "100%", flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {!refresh ? (
          reclamos.length === 0 ||
          (checked && reclamosFiltrados.length === 0) ? (
            <View style={{ flex: 1, alignItems: "center", paddingTop: 350 }}>
              <Text style={{ fontWeight: "bold" }}>
                No hay reclamos para mostrar.
              </Text>
            </View>
          ) : (
            (checked ? reclamosFiltrados : reclamos).map((reclamo) => (
              <CardReclamo key={reclamo.id} reclamo={reclamo} />
            ))
          )
        ) : null}
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
