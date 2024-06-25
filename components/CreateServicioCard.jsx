import React, { useEffect, useState } from "react";
import CreateCardBase from "./CardCreationBase";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, Divider } from "@rneui/base";
import {
  createNormalService,
  createProfessionalService,
} from "../services/serviciosService";
import { Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getRubros } from "../services/dataService";
import { useAuth } from "../context/auth";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { uploadImages } from "../services/formDataService";

const ProfesionalCard = ({ data, setData }) => {
  const [rubrosList, setRubrosList] = useState([]);

  const seleccionarImagen = async () => {
    const restante = 5 - data.imagenes.length;

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
        setData((prevData) => ({
          ...prevData,
          imagenes: [...prevData.imagenes, ...selectedImages],
        }));
      }
    } else {
      Alert.alert(
        "Limite alcanzado",
        "Solo se pueden adjuntar hasta 5 imágenes"
      );
    }
  };

  const removeImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      imagenes: prevData.imagenes.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    getRubros().then((data) => {
      let rubroArray = data.map((rub) => {
        return { key: rub.categoryId, value: rub.description };
      });
      setRubrosList(rubroArray);
    });
  }, []);

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.headerText}>Título del servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Better Call Saul"
        placeholderTextColor="black"
        onChangeText={(text) => {
          setData((prev) => ({ ...prev, title: text }));
        }}
        value={data.title}
      />
      <Text style={styles.headerText}>¿Rubro?</Text>
      <SelectList
        placeholder="Seleccionar rubro"
        setSelected={(val) => {
          setData((prev) => ({ ...prev, categoryId: val }));
        }}
        data={rubrosList}
        save="key"
      />
      <Text style={styles.headerText}>¿Qué se ofrece?</Text>
      <TextInput
        style={[styles.input, { minHeight: 100 }]}
        placeholder="Ingresar la descripcion del servicio..."
        placeholderTextColor="black"
        multiline
        onChangeText={(text) => {
          setData((prev) => ({ ...prev, description: text }));
        }}
        value={data.description}
      />
      <Text style={styles.headerText}>¿En qué horarios?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. De 8AM a 5PM"
        placeholderTextColor="black"
        onChangeText={(text) => {
          setData((prev) => ({ ...prev, hours: text }));
        }}
        value={data.hours}
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
      {Array.isArray(data.imagenes) && data.imagenes.length > 0 && (
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
            {data.imagenes.map((img, index) => (
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
  );
};

const NormalCard = ({ data, setData }) => {
  const seleccionarImagen = async () => {
    const restante = 5 - data.imagenes.length;

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
        setData((prevData) => ({
          ...prevData,
          imagenes: [...prevData.imagenes, ...selectedImages],
        }));
      }
    } else {
      Alert.alert(
        "Limite alcanzado",
        "Solo se pueden adjuntar hasta 5 imágenes"
      );
    }
  };

  const removeImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      imagenes: prevData.imagenes.filter((_, i) => i !== index),
    }));
  };

  return (
    <ScrollView style={styles.main}>
      <Text style={styles.headerText}>Título del servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Libros a domicilio"
        placeholderTextColor="black"
        onChangeText={(text) => {
          setData((prev) => ({ ...prev, title: text }));
        }}
        value={data.title}
      />
      <Divider style={styles.select} inset={true} insetType="middle" />
      <Text style={styles.headerText}>¿Qué se ofrece?</Text>
      <TextInput
        style={[styles.input, { minHeight: 100 }]}
        placeholder="Ingresar la descripcion del servicio..."
        placeholderTextColor="black"
        multiline
        onChangeText={(text) => {
          setData((prev) => ({ ...prev, description: text }));
        }}
        value={data.description}
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
      {Array.isArray(data.imagenes) && data.imagenes.length > 0 && (
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
            {data.imagenes.map((img, index) => (
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
  );
};

const dataInitialState = {
  title: "",
  description: "",
  imagenes: [],
};

const profesionalDataInitialState = {
  title: "",
  description: "",
  hours: "",
  categoryId: 0,
  imagenes: [],
};

const CreateServicioCard = ({ tipo }) => {
  const { user } = useAuth();
  const [data, setData] = useState(dataInitialState);
  const [profesionalData, setProfesionalData] = useState(
    profesionalDataInitialState
  );

  async function handleSubmit() {
    const isValid =
      tipo === "normal"
        ? await validateNormalService()
        : await validateProfesionalService();

    if (!isValid) return;

    const imagenesFileNames =
      tipo === "normal"
        ? data.imagenes.map((imagen) => imagen.fileName)
        : profesionalData.imagenes.map((imagen) => imagen.fileName);

    const response = await (tipo === "normal"
      ? createNormalService({
          ...data,
          document: user.document,
          images: imagenesFileNames,
        })
      : createProfessionalService({
          ...profesionalData,
          document: user.document,
          name: user.name,
          surname: user.surname,
          images: imagenesFileNames,
        }));

    if (response === 200) {
      Alert.alert(
        "Confirmación",
        "Servicio creado. Sera revisado por la municipalidad"
      );
      if (data.imagenes.length > 0) {
        await uploadImages(data.imagenes);
      } else if (profesionalData.imagenes.length > 0) {
        await uploadImages(profesionalData.imagenes);
      }
      setData(dataInitialState);
      setProfesionalData(profesionalDataInitialState);
    } else {
      Alert.alert("Error", "Error al crear el servicio...");
    }
  }

  async function validateNormalService() {
    if (data.title === "" || data.description === "") {
      Alert.alert("Error", "Por favor complete todos los campos");
      return false;
    }
    return true;
  }

  async function validateProfesionalService() {
    if (
      profesionalData.title === "" ||
      profesionalData.description === "" ||
      profesionalData.hours === "" ||
      profesionalData.categoryId === 0
    ) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return false;
    }
    return true;
  }

  return (
    <CreateCardBase
      title={"Crear servicio " + tipo.toUpperCase()}
      handler={handleSubmit}
    >
      {tipo === "normal" ? (
        <NormalCard data={data} setData={setData} />
      ) : (
        <ProfesionalCard data={profesionalData} setData={setProfesionalData} />
      )}
    </CreateCardBase>
  );
};

export default CreateServicioCard;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 5,
    marginTop: 30,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    color: "black",
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
  main: {
    flex: 1,
    flexDirection: "column",
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
