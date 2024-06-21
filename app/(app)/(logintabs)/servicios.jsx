import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardServicio from "../../../components/ServiciosCard";
import { getServicios } from "../../../services/serviciosService";
import { SelectList } from "react-native-dropdown-select-list";
import { getRubros } from "../../../services/dataService";
import { Ionicons } from "@expo/vector-icons";

const Servicios = () => {
  const [refresh, setRefresh] = useState(true);
  const [servicios, setServicios] = useState([]);
  const [filteredServicios, setFilteredServicios] = useState([]);
  const [rubro, setRubro] = useState(null);
  const [rubrosList, setRubrosList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    if (rubro) {
      const filtered = servicios.filter(
        (servicio) =>
          servicio.category && servicio.category.categoryId === rubro
      );
      setFilteredServicios(filtered);
    } else {
      setFilteredServicios(servicios);
    }
  }, [rubro, servicios]);

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
        />
      );
    });
  };

  return (
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
        <Text style={styles.selectListButtonText}>Filtrar por rubro</Text>
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
              placeholder="Seleccionar una categoria"
              setSelected={(val) => {
                setRubro(val);
                setModalVisible(false);
              }}
              data={rubrosList}
              save="key"
              boxStyles={styles.selectList}
            />
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
            style={{ alignSelf: "center", paddingTop: 300, fontWeight: "600" }}
          >
            No hay servicios para mostrar...
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Servicios;

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
    height: "40%",
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
});
