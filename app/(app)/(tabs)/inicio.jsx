import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CardServicio from "../../../components/ServiciosCard";
import { getServicios } from "../../../services/serviciosService";
import { SelectList } from "react-native-dropdown-select-list";
import { getRubros } from "../../../services/dataService";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "@rneui/themed";
import { useAuth } from "../../../context/auth";
import { Button, Dialog } from "@rneui/base";
import { changePassword } from "../../../services/userService";

const InicioPage = () => {
  const [refresh, setRefresh] = useState(true);
  const [servicios, setServicios] = useState([]);
  const [filteredServicios, setFilteredServicios] = useState([]);
  const [rubro, setRubro] = useState(null);
  const [rubrosList, setRubrosList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user && user.firstLogin) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [user]);

  useEffect(() => {
    getServicios().then((data) => {
      setServicios(data);
    });

    getRubros().then((data) => {
      let rubroArray = data.map((rub) => {
        return { key: rub.categoryId, value: rub.description };
      });
      setRubrosList(rubroArray);
    });
    setRefresh(false);
  }, [refresh]);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 3500);
  }, []);

  useEffect(() => {
    let filtered = servicios;
    if (rubro) {
      filtered = filtered.filter(
        (servicio) =>
          servicio.category && servicio.category.categoryId === rubro
      );
    }
    if (checked) {
      filtered = filtered.filter(
        (servicio) => servicio.document === user.document
      );
    }
    setFilteredServicios(filtered);
  }, [rubro, servicios, checked]);

  function getValueByKey(key) {
    const rubro = rubrosList.find((rubro) => rubro.key === key);
    return rubro ? rubro.value : null;
  }

  const renderServices = () => {
    return filteredServicios.map((servicio) => {
      return (
        <CardServicio
          servicio={servicio}
          key={servicio.idService}
          rubro={
            servicio.category
              ? getValueByKey(servicio.category.categoryId)
              : null
          }
          user={user}
        />
      );
    });
  };

  const handleNewPassword = async () => {
    if (newPassword === repeatPassword && newPassword !== "") {
      const response = await changePassword(user.email, newPassword);
      if (response === 200) {
        Alert.alert("Éxito", "Clave actualizada correctamente");
        setNewPassword("");
        setRepeatPassword("");
        setVisible(false);
      } else {
        Alert.alert("Error", "No se pudo actualizar la clave");
      }
    } else {
      Alert.alert("Error", "Las claves no coinciden o están vacías");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectListButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="filter"
            size={24}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.selectListButtonText}>Filtrar</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <SelectList
                placeholder="Seleccionar una rubro"
                setSelected={(val) => {
                  setRubro(val);
                  setModalVisible(false);
                }}
                data={rubrosList}
                save="key"
                boxStyles={styles.selectList}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 5,
                }}
              >
                <Switch
                  value={checked}
                  onValueChange={(value) => setChecked(value)}
                />
                <Text
                  style={{ fontSize: 12, fontWeight: "500", paddingLeft: 5 }}
                >
                  Mis servicios
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[{ marginRight: 5 }, styles.modalCloseButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[{ marginLeft: 5 }, styles.modalEliminarButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setRubro(null);
                  }}
                >
                  <Text style={styles.modalCloseButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          {!refresh && servicios && filteredServicios.length !== 0 ? (
            renderServices()
          ) : (
            <Text
              style={{
                alignSelf: "center",
                paddingTop: 300,
                fontWeight: "600",
              }}
            >
              No hay servicios para mostrar...
            </Text>
          )}
        </ScrollView>
      </View>
      <Dialog
        isVisible={visible}
        animationType="fade"
        overlayStyle={styles.dialog}
      >
        <Dialog.Title
          titleStyle={{ textAlign: "center" }}
          title={<Text style={{ color: "white" }}>Ingresar nueva clave</Text>}
        />
        <View style={styles.containerInput}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              Nueva clave
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextInput
              value={newPassword}
              style={styles.input}
              placeholder="Escribir..."
              placeholderTextColor={"white"}
              secureTextEntry={true}
              onChangeText={setNewPassword}
            />
          </View>
        </View>
        <View style={styles.containerInput}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingTop: 10,
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              Nueva clave
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextInput
              value={repeatPassword}
              style={styles.input}
              placeholder="Escribir..."
              placeholderTextColor={"white"}
              secureTextEntry={true}
              onChangeText={setRepeatPassword}
            />
          </View>
        </View>
        <Button
          title={"Aceptar"}
          style={{ marginTop: 50 }}
          radius={"sm"}
          buttonStyle={{ width: 140 }}
          size={"md"}
          color={"#2b292b"}
          onPress={handleNewPassword}
        />
      </Dialog>
    </>
  );
};

export default InicioPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6c2d1",
  },
  selectListButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  selectListButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    width: "80%",
    height: "43%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  selectList: {
    width: Dimensions.get("window").width * 0.75,
    backgroundColor: "white",
  },
  modalEliminarButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e85651",
    borderRadius: 5,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 10, 10, 0.5)",
  },
  dialog: {
    width: 350,
    height: 350,
    padding: 10,
    backgroundColor: "#2a4d78",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    width: "95%",
    color: "white",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#dedfe0",
    opacity: 1,
    marginTop: 2,
    backgroundColor: "#2a4d78",
    borderWidth: 1,
    marginTop: 10,
  },
  headerPassword: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
    fontFamily: "Rubik_500Medium",
  },
  textPassword: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
});
