import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../../context/auth";

const PerfilPage = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>perfil</Text>
    </View>
  );
};

export default PerfilPage;
