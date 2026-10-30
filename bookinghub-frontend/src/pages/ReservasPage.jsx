
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Stack
} from "@mui/material";

import { useLocation } from "react-router-dom";
import { obtenerServicios } from "../services/servicioService";
import { obtenerProfesionales } from "../services/profesionalService";
import { guardarReserva } from "../services/reservaService";

function ReservasPage() {
  const location = useLocation();

  const [servicios, setServicios] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    nombreCliente: "",
    correo: "",
    servicioId: location.state?.servicioId ?? "",
    profesionalId: location.state?.profesionalId ?? "",
    fecha: "",
    hora: ""
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerServicios();
        setServicios(datos);
        setProfesionales(await obtenerProfesionales());
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const actualizarCampo = (event) => {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();
    setMensaje("");
    setError("");

    const fechaHora = new Date(
      `${formulario.fecha}T${formulario.hora}`
    );

    if (fechaHora <= new Date()) {
      setError("Debes seleccionar una fecha y hora futuras.");
      return;
    }

    try {
      setGuardando(true);
      await guardarReserva({
        ...formulario,
        servicioId: Number(formulario.servicioId),
        profesionalId: Number(formulario.profesionalId)
      });
      setMensaje("La reserva se guardó correctamente.");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar la reserva en Excel.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 750 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Nueva reserva
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Completa los datos para solicitar una cita.
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={manejarEnvio}>
            <Stack spacing={3}>
              <TextField
                label="Nombre del cliente"
                name="nombreCliente"
                value={formulario.nombreCliente}
                onChange={actualizarCampo}
                required
                fullWidth
              />

              <TextField
                label="Correo electrónico"
                name="correo"
                type="email"
                value={formulario.correo}
                onChange={actualizarCampo}
                required
                fullWidth
              />

              <TextField
                select
                label="Servicio"
                name="servicioId"
                value={formulario.servicioId}
                onChange={actualizarCampo}
                required
                fullWidth
              >
                {servicios.map((servicio) => (
                  <MenuItem key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Profesional"
                name="profesionalId"
                value={formulario.profesionalId}
                onChange={actualizarCampo}
                required
                fullWidth
              >
                {profesionales.map((profesional) => (
                  <MenuItem
                    key={profesional.id}
                    value={profesional.id}
                  >
                    {profesional.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Fecha de la cita"
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={actualizarCampo}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                required
                fullWidth
              />

              <TextField
                label="Hora de la cita"
                type="time"
                name="hora"
                value={formulario.hora}
                onChange={actualizarCampo}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                required
                fullWidth
              />

              {(cargando || guardando) && <CircularProgress />}

              {error && (
                <Alert severity="error">{error}</Alert>
              )}

              {mensaje && (
                <Alert severity="info">{mensaje}</Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={cargando || guardando || Boolean(error)}
              >
                {guardando ? "Guardando..." : "Guardar reserva"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReservasPage;
