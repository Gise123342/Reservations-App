
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { obtenerProfesionales } from "../services/profesionalService";

function ProfesionalesPage() {
  const navigate = useNavigate();
  const [profesionales, setProfesionales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProfesionales = async () => {
      try {
        setProfesionales(await obtenerProfesionales());
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los profesionales.");
      } finally {
        setCargando(false);
      }
    };

    cargarProfesionales();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Profesionales
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Conoce a nuestros profesionales disponibles.
      </Typography>

      {cargando && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {profesionales.map((profesional) => (
          <Grid
            key={profesional.id}
            size={{ xs: 12, md: 6, lg: 4 }}
          >
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "#2563eb",
                    fontSize: 28
                  }}
                >
                  {profesional.nombre
                    .split(" ")
                    .slice(-2)
                    .map((n) => n[0])
                    .join("")}
                </Avatar>

                <Typography variant="h6" fontWeight="bold">
                  {profesional.nombre}
                </Typography>

                <Chip
                  label={profesional.especialidad}
                  color="primary"
                  variant="outlined"
                  sx={{ my: 2 }}
                />

                <Typography color="text.secondary">
                  Experiencia: {profesional.experiencia}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() =>
                    navigate("/reservas", {
                      state: { profesionalId: profesional.id }
                    })
                  }
                >
                  Agendar cita
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProfesionalesPage;
