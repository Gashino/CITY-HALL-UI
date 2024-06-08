import api from "./axiosConfig";

export const getDenuncias = async (dni) => {
  try {
    const response = await api.get("/api/complaint?document=" + dni);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const publicarDenuncia = async (denuncia) => {
  try {
    const response = await api.post("/api/complaint/create", denuncia);
    return response.status;
  } catch {
    console.error("Error:", error);
  }
};
