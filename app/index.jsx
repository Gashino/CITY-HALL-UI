import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { usePushNotifications } from "../context/usePushNotifications";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const index = () => {
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("We need access to your media library to proceed!");
      }
    };

    const getImagePicker = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Necesitamos los permisos de la galeria para continuar.");
        return;
      }
    };
    getImagePicker();
    getPermission();
  }, []);

  const { expoPushToken, notification } = usePushNotifications();
  return <Redirect href="/servicios" />;
};

export default index;
