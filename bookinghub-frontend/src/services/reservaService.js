import axios from "axios";

const API_URL = "http://localhost:8080/api/reservas";

export const guardarReserva = async (reserva) => {
  const response = await axios.post(API_URL, reserva);
  return response.data;
};

export const obtenerReservas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
