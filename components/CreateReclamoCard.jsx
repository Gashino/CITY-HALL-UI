import React, { useEffect, useState } from "react";
import CreateCardBase from "./CardCreationBase";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getDesperfectos, getSites } from "../services/dataService";
import { Button, Divider } from "@rneui/base";
import { publicarReclamo } from "../services/reclamosService";
import { useAuth } from "../context/auth";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { uploadImages } from "../services/formDataService";

const CreationReclamoCard = () => {
  const [sitio, setSitio] = useState(null);
  const [desperfecto, setDesperfecto] = useState(null);
  const [sitiosList, setSitiosList] = useState([]);
  const [desperfectosList, setDesperfectos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const { user } = useAuth();
  const [image, setImage] = useState([]);

  useEffect(() => {
    getSites().then((data) => {
      let siteArray = data.map((site) => {
        return { key: site.Id, value: site.Description };
      });
      setSitiosList(siteArray);
    });

    getDesperfectos().then((data) => {
      let desArray = data.map((des) => {
        return {
          key: des.idFlaw,
          value: des.description,
          idCategory: des.category.categoryId,
        };
      });

      if (user.isAdmin) {
        desArray = desArray.filter(
          (des) => des.idCategory === user.category.categoryId
        );
      }
      setDesperfectos(desArray);
    });
  }, []);

  async function handleSubmit() {
    if (!sitio || !desperfecto || descripcion === "") {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    const imagenesFileNames = image.map((imagen) => imagen.fileName);

    const respuesta = await publicarReclamo(
      user.document,
      sitio,
      desperfecto,
      descripcion,
      imagenesFileNames
    );
    if (respuesta === 200) {
      Alert.alert("Confirmación", "Reclamo creado con éxito");
      setDescripcion("");
      setSitio(null);
      setDesperfecto(null);
      if (image.length > 0) {
        await uploadImages(image);
      }
      setImage([]);
    } else {
      Alert.alert("Error", "Error al crear el reclamo");
    }
  }

  const seleccionarImagen = async () => {
    const restante = 5 - image.length;

    if (restante != 0) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [16, 9],
        quality: 0.5,
        allowsMultipleSelection: true,
        selectionLimit: restante,
      });
      if (!result.canceled) {
        const selectedImages = result.assets.map((asset) => asset);
        setImage((prevImages) => [...prevImages, ...selectedImages]);
      }
    } else {
      Alert.alert(
        "Limite alcanzado",
        "Solo se pueden adjuntar hasta 5 imágenes"
      );
    }
  };

  const removeImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

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
          value={descripcion}
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
            onPress={seleccionarImagen}
          />
        </View>
        <Divider style={styles.select} inset={true} insetType="middle" />
        {Array.isArray(image) && image.length > 0 && (
          <>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 10,
                fontWeight: "600",
              }}
            >
              Imágenes adjuntas
            </Text>
            <ScrollView horizontal>
              {image.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ position: "relative", marginRight: 5 }}
                  onPress={() => removeImage(index)}
                >
                  <Image
                    source={{ uri: img.uri }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.text}>X</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CreationReclamoCard;
