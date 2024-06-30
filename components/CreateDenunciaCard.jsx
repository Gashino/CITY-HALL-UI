import React, { useState, useEffect } from "react";
import CreateCardBase from "./CardCreationBase";
import { useAuth } from "../context/auth";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { getSites, getVecinos } from "../services/dataService";
import { CheckBox, Divider, Text, Dialog, Button } from "@rneui/base";
import { Switch } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { publicarDenuncia } from "../services/denunciasService";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { uploadImages } from "../services/formDataService";
import * as Network from "expo-network";

const CreationReclamoCard = () => {
  const { user } = useAuth();
  const [sitio, setSitio] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [denunciado, setDenunciado] = useState(null);
  const [sitiosList, setSitiosList] = useState([]);
  const [denunciadosList, setDenunciadosList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [image, setImage] = useState([]);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    getVecinos().then((data) => {
      let vecinoArray = data.map((vecino) => {
        return {
          key: vecino.document,
          value: `${vecino.name} ${vecino.surname} - DNI: ${vecino.document}`,
        };
      });
      setDenunciadosList(vecinoArray);
    });
    getSites().then((data) => {
      let siteArray = data.map((site) => {
        return { key: site.Id, value: site.Description };
      });
      setSitiosList(siteArray);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const networkState = await Network.getNetworkStateAsync();
      setNetwork(networkState);
    })();
  }, []);

  handleChekbox = () => {
    if (checkbox === false) {
      setVisible1(!visible1);
    }
    setCheckbox(!checkbox);
  };

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 0.5,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset);
      setImage((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const removeImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  toggleDialog = () => {
    setVisible1(!visible1);
  };

  async function handleSubmit() {
    if (network.type === "CELLULAR") {
      Alert.alert(
        "Advertencia",
        "¿Desea enviar el reclamo con conexión móvil?",
        [
          {
            text: "No",
            onPress: () => {
              return;
            },
            style: "cancel",
          },
          {
            text: "Sí",
          },
        ],
        { cancelable: false }
      );
    }

    const imagenesFileNames = image.map((imagen) => imagen.fileName);

    const denuncia = {
      issuerDocument: user.document,
      description: descripcion,
      siteId: sitio ? sitio : null,
      denouncedDocument: denunciado ? denunciado : "",
      images: imagenesFileNames.length > 0 ? [...imagenesFileNames] : [],
    };

    if (checkbox && descripcion !== "" && (sitio || denunciado)) {
      const respuesta = await publicarDenuncia(denuncia);
      if (respuesta === 200) {
        Alert.alert("Confirmación", "Denuncia creada con éxito");
        setCheckbox(false);
        setDenunciado(null);
        setDescripcion("");
        setSitio(null);
        if (image.length > 0) {
          await uploadImages(image);
        }
        setImage([]);
      } else {
        Alert.alert("Error", "Error al crear la denuncia");
      }
    } else {
      Alert.alert(
        "Error",
        "Debe completar todos los campos y aceptar la responsabilidad"
      );
    }
  }
  return (
    <CreateCardBase title={"Crear una denuncia"} handler={handleSubmit}>
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
        <Switch
          value={checked}
          onValueChange={(value) => {
            setDenunciado(null);
            setSitio(null);
            setChecked(value);
          }}
        />
      </View>
      <ScrollView style={styles.main}>
        {checked ? (
          <View style={styles.selectContainer}>
            <Text style={styles.headerText}>¿A qué sitio desea denunciar?</Text>
            <SelectList
              placeholder="Seleccionar sitio"
              setSelected={(val) => {
                setSitio(val);
              }}
              data={sitiosList}
              save="key"
            />
          </View>
        ) : (
          <View style={styles.selectContainer}>
            <Text style={styles.headerText}>¿A quién desea denunciar?</Text>
            <SelectList
              placeholder="Seleccionar vecino"
              setSelected={(val) => {
                setDenunciado(val);
              }}
              data={denunciadosList}
              save="key"
            />
          </View>
        )}
        <Divider style={styles.select} inset={true} insetType="middle" />
        <Text style={styles.headerText}>Motivo de la denuncia</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresar la descripcion de la denuncia..."
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
            onPress={seleccionarImagen}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <CheckBox
            onPress={handleChekbox}
            checked={checkbox}
            title={"¿Acepta responsabilidad?"}
            checkedColor="green"
          ></CheckBox>
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
      <Dialog
        isVisible={visible1}
        onBackdropPress={toggleDialog}
        overlayStyle={styles.dialog}
        animationType="slide"
      >
        <Dialog.Title
          title={<Ionicons name="warning" size={30} color="red" />}
        />
        <Dialog.Title title={<Text>Advertencia </Text>} />
        <Text
          style={{
            textAlign: "center",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          Al seleccionar esta opción, usted asume plena responsabilidad sobre la
          denuncia. En caso de falsedad, esto podría utilizarse en su{" "}
          <Text style={{ fontWeight: "bold" }}>contra.</Text>
        </Text>
      </Dialog>
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
    marginTop: 10,
  },
  select: {
    marginTop: 10,
    marginBottom: 20,
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  textSelect: {
    fontWeight: "500",
  },
  selectContainer: { marginTop: 10 },
  dialog: {
    width: 300,
    height: 200,
    padding: 10,
    backgroundColor: "#f78b8c",
    borderRadius: 10,
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
