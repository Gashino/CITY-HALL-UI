import api from "./axiosConfig";

export const getServicios = async () => {
  try {
    const response = await api.get("/api/service/");
    return response.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
