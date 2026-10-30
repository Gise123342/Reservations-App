
import axios from "axios";

const API_URL = "http://localhost:8080/api/servicios";

export const obtenerServicios = async () => {
  const response = await axios.get(API_URL);

  return Array.isArray(response.data)
    ? response.data
    : [response.data];
};
