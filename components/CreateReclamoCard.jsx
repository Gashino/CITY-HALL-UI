import React, { useEffect, useState } from "react";
import CreateCardBase from "./CardCreationBase";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getDesperfectos, getSites } from "../services/dataService";
import { Button, Divider } from "@rneui/base";
import { publicarReclamo } from "../services/reclamosService";
import { useAuth } from "../context/auth";

const CreationReclamoCard = () => {
  const [sitio, setSitio] = useState(null);
  const [desperfecto, setDesperfecto] = useState(null);
  const [sitiosList, setSitiosList] = useState([]);
  const [desperfectosList, setDesperfectos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getSites().then((data) => {
      let siteArray = data.map((site) => {
        return { key: site.Id, value: site.Description };
      });
      setSitiosList(siteArray);
    });

    getDesperfectos().then((data) => {
      let desArray = data.map((des) => {
        return { key: des.idFlaw, value: des.description };
      });
      setDesperfectos(desArray);
    });
  }, []);

  async function handleSubmit() {
    const respuesta = await publicarReclamo(
      user.document,
      sitio,
      desperfecto,
      descripcion
    );
    if (respuesta === 200) {
      Alert.alert("Confirmación", "Reclamo creado con éxito");
    } else {
      Alert.alert("Error", "Error al crear el reclamo");
    }
  }

  return (
    <CreateCardBase title={"Crear un reclamo"} handler={handleSubmit}>
      <ScrollView style={styles.main}>
        <Text style={styles.headerText}>¿Dónde se genera el reclamo?</Text>
        <SelectList
          placeholder="Seleccionar sitio"
          setSelected={(val) => {
            setSitio(val);
          }}
          data={sitiosList}
          save="key"
        />
        <Divider style={styles.select} inset={true} insetType="middle" />
        <Text style={styles.headerText}>¿Qué tipo de desperfecto?</Text>
        <SelectList
          placeholder="Seleccionar desperfecto"
          setSelected={(val) => {
            setDesperfecto(val);
          }}
          data={desperfectosList}
          save="key"
        />
        <Divider style={styles.select} inset={true} insetType="middle" />
        <View style={{ marginTop: 10 }} />
        <Text style={styles.headerText}>Describa lo sucedido</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresar la descripcion del reclamo..."
          placeholderTextColor="black"
          multiline
          onChangeText={(text) => {
            setDescripcion(text);
          }}
        />
        <Divider style={styles.select} inset={true} insetType="middle" />
        <View style={styles.cameraContainer}>
          <Button
            title="Adjuntar imágenes"
            icon={{
              name: "camera",
              type: "font-awesome",
              size: 18,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "600" }}
            buttonStyle={{
              backgroundColor: "#1d3552",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: 210,
              justifyContent: "center",
            }}
          />
        </View>
      </ScrollView>
    </CreateCardBase>
  );
};

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
});

export default CreationReclamoCard;
