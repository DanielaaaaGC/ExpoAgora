import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UsuarioProvider } from "./context/UsuarioContext";
import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Tasks from "./pages/Tasks";
import Grades from "./pages/Grades";
import Resources from "./pages/Resources";
import Achievements from "./pages/Achievements";
import Voting from "./pages/Voting";
import Participation from "./pages/Participation";
import Events from "./pages/Events";
import Ideas from "./pages/Ideas";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cursos" element={<Courses />} />
            <Route path="tareas" element={<Tasks />} />
            <Route path="calificaciones" element={<Grades />} />
            <Route path="recursos" element={<Resources />} />
            <Route path="logros" element={<Achievements />} />
            <Route path="insignias" element={<Achievements />} />
            <Route path="votaciones" element={<Voting />} />
            <Route path="participacion" element={<Participation />} />
            <Route path="eventos" element={<Events />} />
            <Route path="ideas" element={<Ideas />} />
            <Route path="foros" element={<Ideas />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="historial" element={<History />} />
            <Route path="ajustes" element={<Settings />} />
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  );
}
