import { View } from "react-native";
import { Text } from "@rneui/base";
import { router } from "expo-router";
import { Link } from "@react-navigation/native";

export default function NotificacionesScreen() {
  const isPresented = router.canGoBack();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.canGoBack("perfil");
          }}
        >
          ButtonBack
        </Text>
        <Text style={{ flex: 1, textAlign: "center" }}>Notificaciones</Text>
        <Text style={{ opacity: 0 }}>Placeholder</Text>
      </View>
      {!isPresented && <Link href="../">Dismiss</Link>}
    </View>
  );
}
