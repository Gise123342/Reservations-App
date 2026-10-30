
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";

import {
  Dashboard,
  MedicalServices,
  People,
  CalendarMonth
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const opciones = [
  { nombre: "Dashboard", ruta: "/", icono: <Dashboard /> },
  { nombre: "Servicios", ruta: "/servicios", icono: <MedicalServices /> },
  { nombre: "Profesionales", ruta: "/profesionales", icono: <People /> },
  { nombre: "Reservas", ruta: "/reservas", icono: <CalendarMonth /> }
];

function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        backgroundColor: "#172b4d",
        color: "white",
        flexShrink: 0
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontFamily: "Poppins, sans-serif" }}
        >
          Reservations App
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Sistema de reservas
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List sx={{ px: 1, mt: 2 }}>
        {opciones.map((opcion) => (
          <ListItemButton
            key={opcion.ruta}
            component={NavLink}
            to={opcion.ruta}
            end={opcion.ruta === "/"}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: "white",
              "&.active": {
                backgroundColor: "#2563eb"
              },
              "&:hover": {
                backgroundColor: "#334b70"
              }
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {opcion.icono}
            </ListItemIcon>
            <ListItemText primary={opcion.nombre} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
