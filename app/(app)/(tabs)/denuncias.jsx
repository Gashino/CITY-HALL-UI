import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import CardDenuncia from "../../../components/DenunciaCard";
import { useFocusEffect } from "expo-router";
import { getDenuncias } from "../../../services/denunciasService";
import { useAuth } from "../../../context/auth";
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
          <ActivityIndicator />
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
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
