
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Alert
} from "@mui/material";

import {
  AccessTime,
  MedicalServices
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { obtenerServicios } from "../services/servicioService";

function ServiciosPage() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const datos = await obtenerServicios();
        setServicios(datos);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setCargando(false);
      }
    };

    cargarServicios();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Servicios disponibles
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explora los servicios que ofrecemos.
      </Typography>

      {cargando && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {servicios.map((servicio) => (
          <Grid key={servicio.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ borderRadius: 3, height: "100%" }}>
              <CardContent>
                <MedicalServices
                  sx={{ fontSize: 40, color: "#2563eb", mb: 2 }}
                />

                <Typography variant="h6" fontWeight="bold">
                  {servicio.nombre}
                </Typography>

                <Chip
                  label="Disponible"
                  color="success"
                  size="small"
                  sx={{ mt: 2 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 3
                  }}
                >
                  <AccessTime color="action" />
                  <Typography>
                    {servicio.duracionMinutos} minutos
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  color="primary"
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  ${Number(servicio.precio).toFixed(2)}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate("/reservas", {
                      state: { servicioId: servicio.id }
                    })
                  }
                >
                  Reservar cita
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ServiciosPage;
