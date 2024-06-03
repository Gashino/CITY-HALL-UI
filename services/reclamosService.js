import api from "./axiosConfig";

export const publicarReclamo = async (
  userDni,
  idSitio,
  idDesperfecto,
  descripcion
) => {
  try {
    const response = await api.post("/api/claim/create", {
      document: userDni,
      idSite: idSitio,
      idFlaw: idDesperfecto,
      description: descripcion,
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
