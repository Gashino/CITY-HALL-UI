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
