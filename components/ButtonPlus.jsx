import React from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default class AddButton extends React.Component {
  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
        duration: 120,
        useNativeDriver: false,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
        duration: 120,
        useNativeDriver: false,
      }),
    ]).start();
  };

  render() {
    const thermometerX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100],
    });

    const thermometerY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const pulseX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50],
    });

    const pulseY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
    });

    const sizeStyle = {
      transform: [{ scale: this.buttonSize }],
    };

    return (
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Animated.View
          style={{
            position: "absolute",
            left: thermometerX,
            top: thermometerY,
          }}
        >
          <View style={styles.secondaryButton}>
            <Pressable
              onPress={() => router.navigate("reclamoCreation")}
              onPressOut={() => this.handlePress()}
              style={{ alignItems: "center", justifyContent: "center" }}
              activeOpacity={1}
            >
              <Ionicons name="build-outline" size={24} color="#FFF" />
            </Pressable>
          </View>
        </Animated.View>
        <Animated.View
          style={{ position: "absolute", left: pulseX, top: pulseY }}
        >
          <View style={styles.secondaryButton}>
            <Pressable
              onPress={() => router.navigate("denunciaCreation")}
              onPressOut={() => this.handlePress()}
              style={{ alignItems: "center", justifyContent: "center" }}
              activeOpacity={1}
            >
              <Ionicons name="alert-circle-outline" size={24} color="#FFF" />
            </Pressable>
          </View>
        </Animated.View>
        <Animated.View style={[styles.button, sizeStyle]}>
          <Pressable onPress={this.handlePress} underlayColor="#7F58FF">
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <FontAwesome5 name="plus" size={24} color="#FFF" />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1d3552",
    position: "absolute",
    marginTop: -45,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    marginTop: 10,
    borderRadius: 24,
    backgroundColor: "#1d3552",
  },
});
