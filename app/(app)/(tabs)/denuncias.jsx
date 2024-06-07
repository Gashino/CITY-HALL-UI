import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CardDenuncia from "../../../components/DenunciaCard";
import { useFocusEffect } from "expo-router";
import { getDenuncias } from "../../../services/denunciasService";
import { useAuth } from "../../../context/auth";
import { Text } from "@rneui/base";
const DenunciasPage = () => {
  const { user } = useAuth();
  const [denuncias, setDenuncias] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setisLoading(true);
      getDenuncias(user.document).then((data) => {
        let denunciaArray = data.map((denuncia) => {
          return {
            idComplaint: denuncia.idComplaint,
            siteStreet: denuncia.siteStreet,
            siteNumber: denuncia.siteNumber,
            description: denuncia.description,
            status: denuncia.status,
            documentDenounced: denuncia.documentDenounced,
          };
        });
        denunciaArray.sort((a, b) => {
          if (a.documentDenounced === user.document) {
            return -1;
          } else if (b.documentDenounced === user.document) {
            return 1;
          }
          return 0;
        });
        setDenuncias(denunciaArray);
        setisLoading(false);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            color={"#000"}
            size={"large"}
            style={{ flex: 1, justifyContent: "center", paddingTop: 350 }}
          />
        ) : denuncias.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 350 }}>
            <Text style={{ fontWeight: "bold" }}>
              No hay denuncias para mostrar.
            </Text>
          </View>
        ) : (
          denuncias.map((denuncia) => (
            <CardDenuncia key={denuncia.idComplaint} denuncia={denuncia} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default DenunciasPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b6c2d1",
  },
});
