import React, { useState, useEffect } from "react"; // Add the missing import statement for useEffect
import CreateCardBase from "./CardCreationBase";
import { useAuth } from "../context/auth";
import { ScrollView, StyleSheet, View } from "react-native";
import { getSites } from "../services/dataService";
import { Text } from "@rneui/base";
import { Switch } from "@rneui/themed";

const CreationReclamoCard = () => {
  const { user } = useAuth();
  const [sitio, setSitio] = useState(null);
  const [denunciado, seDenunciado] = useState(null);
  const [sitiosList, setSitiosList] = useState([]);
  const [denunciadosList, setDenunciadosList] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getSites().then((data) => {
      let siteArray = data.map((site) => {
        return { key: site.Id, value: site.Description };
      });
      setSitiosList(siteArray);
    });
  }, []);

  return (
    <CreateCardBase title={"Crear una denuncia"}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.textSelect}>
          Denunciar a un <Text style={{ fontWeight: "600" }}>sitio</Text>{" "}
        </Text>
        <Switch value={checked} onValueChange={(value) => setChecked(value)} />
      </View>
      <ScrollView style={styles.main}></ScrollView>
    </CreateCardBase>
  );
};

export default CreationReclamoCard;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    color: "black",
  },
  main: {
    flex: 1,
    flexDirection: "column",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 5,
    marginTop: 30,
  },
  select: {
    marginTop: 10,
    marginBottom: 20,
  },
  cameraContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textSelect: {
    fontWeight: "500",
  },
});
