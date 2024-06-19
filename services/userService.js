import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./axiosConfig";

export const loginUser = async (access, password) => {
  try {
    const response = await api.post("/api/person/auth/login", {
      access: access,
      password: password,
    });
    if (response.status === 200) {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const registerUser = async (mail, dni, setResponseCode, token) => {
  try {
    const response = await api.post(
      `/api/person/register?dni=${dni}&email=${mail}&tokenPush=${token}`
    );
    if (response.status === 201) {
      setResponseCode(201);
    }
  } catch (error) {
    console.error("Error:", error);
    setResponseCode(error.response.status);
  }
};

export const forgotPassword = async (mail) => {
  try {
    await api.post(`/api/person/forgotPassword?email=${mail}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const changePassword = async (access, newPassword) => {
  try {
    const response = await api.put("/api/person/changePassword", {
      access: access,
      password: newPassword,
    });
    return response.status;
  } catch (error) {
    return response.status;
  }
};
