import api from "./axiosConfig";

export const publicarReclamo = async (
  userDni,
  idSitio,
  idDesperfecto,
  descripcion,
  images
) => {
  try {
    const response = await api.post("/api/claim/create", {
      document: userDni,
      idSite: idSitio,
      idFlaw: idDesperfecto,
      description: descripcion,
      images: [...images],
    });
    return response.status;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getReclamos = async () => {
  try {
    const response = await api.get("/api/claim/");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getReclamosByRubro = async (rubro) => {
  try {
    const response = await api.get(`/api/claim?rubro=${rubro}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
