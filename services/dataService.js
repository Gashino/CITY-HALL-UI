import api from "./axiosConfig";

export const getSites = async () => {
  try {
    const response = await api.get("/api/data/sites");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};

export const getDesperfectos = async () => {
  try {
    const response = await api.get("/api/data/flaws");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};

export const getVecinos = async () => {
  try {
    const response = await api.get("/api/data/neighbors");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
};

export const getNotifications = async (token) => {
  try {
    const response = await api.get(`/api/data/notifications/${token}`);
    return response.data;
  } catch (e) {
    console.error("Error:", error);
    return [];
  }
};

export const getRubros = async () => {
  try {
    const response = await api.get("/api/data/categories");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
