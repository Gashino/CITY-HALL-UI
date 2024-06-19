import { Redirect } from "expo-router";
import React from "react";
import { usePushNotifications } from "../context/usePushNotifications";

const index = () => {
  const { expoPushToken, notification } = usePushNotifications();
  return <Redirect href="/servicios" />;
};

export default index;
