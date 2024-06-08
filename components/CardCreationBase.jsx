import { Button, Icon } from "@rneui/base";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default CreateCardBase = ({ title, children, handler }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "semibold",
              fontSize: 18,
              color: "white",
            }}
          >
            {title}
          </Text>
        </View>
        {children}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handler}
          title="Enviar"
          style={styles.button}
          color={"#73182a"}
          buttonStyle={{
            borderRadius: 10,
            width: 270,
          }}
          iconRight
          icon={
            <Icon
              name="send"
              size={18}
              color="white"
              iconStyle={{ marginLeft: 10 }}
            />
          }
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e8e6",
    padding: 8,
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    height: "80%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1d3552",
    borderRadius: 10,
    width: "100%",
  },
  buttonContainer: {
    padding: 30,
    shadowColor: "#000",
  },
});
