import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const ServicioCreationPage = () => {
  const { tipo } = useLocalSearchParams();
  return (
    <View>
      <Text>{tipo}</Text>
    </View>
  );
};

export default ServicioCreationPage;
