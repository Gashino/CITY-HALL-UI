import api from "./axiosConfig";

export const getServicios = async () => {
  try {
    const response = await api.get("/api/service/");
    return response.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const createNormalService = async (data) => {
  try {
    const response = await api.post("/api/service/create", data);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const createProfessionalService = async (data) => {
  try {
    const response = await api.post("/api/service/create/profesional", data);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarService = async (id) => {
  try {
    const response = await api.delete(`/api/service/delete/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
