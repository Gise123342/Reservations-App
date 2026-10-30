import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";

import {
  CalendarMonth,
  People,
  MedicalServices,
  EventAvailable
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { obtenerReservas } from "../services/reservaService";
import { obtenerServicios } from "../services/servicioService";
import { obtenerProfesionales } from "../services/profesionalService";

const estadisticasBase = [
  {
    titulo: "Citas de hoy",
    valor: 0,
    icono: <CalendarMonth />,
    color: "#2563eb"
  },
  {
    titulo: "Profesionales",
    valor: 0,
    icono: <People />,
    color: "#16a34a"
  },
  {
    titulo: "Servicios",
    valor: 0,
    icono: <MedicalServices />,
    color: "#9333ea"
  },
  {
    titulo: "Reservas pendientes",
    valor: 0,
    icono: <EventAvailable />,
    color: "#ea580c"
  }
];

function DashboardPage() {
  const [estadisticas, setEstadisticas] = useState(estadisticasBase);
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [reservasCargadas, serviciosCargados, profesionalesCargados] =
          await Promise.all([
            obtenerReservas(),
            obtenerServicios(),
            obtenerProfesionales()
          ]);

        setReservas(reservasCargadas);
        setServicios(serviciosCargados);
        setProfesionales(profesionalesCargados);

        const ahora = new Date();
        const hoy = [
          ahora.getFullYear(),
          String(ahora.getMonth() + 1).padStart(2, "0"),
          String(ahora.getDate()).padStart(2, "0")
        ].join("-");

        const citasDeHoy = reservasCargadas.filter(
          (reserva) => reserva.fecha === hoy
        ).length;

        const reservasPendientes = reservasCargadas.filter((reserva) => {
          const fechaHora = new Date(`${reserva.fecha}T${reserva.hora}`);
          return !Number.isNaN(fechaHora.getTime()) && fechaHora > ahora;
        }).length;

        setEstadisticas((anteriores) => anteriores.map((item) => {
          if (item.titulo === "Citas de hoy") {
            return { ...item, valor: citasDeHoy };
          }

          if (item.titulo === "Profesionales") {
            return { ...item, valor: profesionalesCargados.length };
          }

          if (item.titulo === "Servicios") {
            return { ...item, valor: serviciosCargados.length };
          }

          if (item.titulo === "Reservas pendientes") {
            return { ...item, valor: reservasPendientes };
          }

          return item;
        }));
      } catch (err) {
        console.error("No se pudieron cargar los datos del Dashboard.", err);
        setError("No se pudieron cargar los datos del Dashboard.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const obtenerNombre = (lista, id) =>
    lista.find((item) => item.id === id)?.nombre ?? `ID ${id}`;

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Bienvenido al panel de administración de Reservations App.
      </Typography>

      <Grid container spacing={3}>
        {estadisticas.map((item) => (
          <Grid key={item.titulo} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2
                  }}
                >
                  {item.icono}
                  <Typography fontWeight="medium">
                    {item.titulo}
                  </Typography>
                </Box>

                <Typography variant="h3" fontWeight="bold">
                  {item.valor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 4, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            Reservas registradas
          </Typography>

          {cargando && <CircularProgress size={28} />}
          {error && <Alert severity="error">{error}</Alert>}

          {!cargando && !error && reservas.length === 0 && (
            <Typography color="text.secondary">
              Todavía no hay reservas registradas.
            </Typography>
          )}

          {!cargando && !error && reservas.length > 0 && (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 720 }} aria-label="reservas registradas">
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Profesional</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservas.map((reserva) => (
                    <TableRow key={reserva.id} hover>
                      <TableCell>{reserva.nombreCliente}</TableCell>
                      <TableCell>{reserva.correo}</TableCell>
                      <TableCell>
                        {obtenerNombre(servicios, reserva.servicioId)}
                      </TableCell>
                      <TableCell>
                        {obtenerNombre(profesionales, reserva.profesionalId)}
                      </TableCell>
                      <TableCell>{reserva.fecha}</TableCell>
                      <TableCell>{reserva.hora}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
