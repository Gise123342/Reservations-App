
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ServiciosPage from "./pages/ServiciosPage";
import ProfesionalesPage from "./pages/ProfesionalesPage";
import ReservasPage from "./pages/ReservasPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route
            path="/servicios"
            element={<ServiciosPage />}
          />

          <Route
            path="/profesionales"
            element={<ProfesionalesPage />}
          />

          <Route
            path="/reservas"
            element={<ReservasPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
