import { Route, Routes } from "react-router-dom";
import { GestionPublicacionesRouter } from "../modules/gestion-publicaciones/router/GestionPublicacionesRouter";
import { MiPerfilRouter } from "../modules/mi-perfil/router/MiPerfilRouter";
import { HomeRouter } from "../modules/home/router/HomeRouter";
import { VerPublicacionRouter } from "../modules/ver-publicacion/router/VerPublicacionRouter";
import { MensajesRouter } from "../modules/mensajes/router/MensajesRouter";
import { PerfilEmprendedor } from "../modules/perfil-emprendedor/view/PerfilEmprendedor";
import { SolicitudesRouter } from "../modules/solicitudes/router/SolicitudesRouter";

function AppRoutes() {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/" element={<HomeRouter />} />
        <Route
          path="/gestion-publicaciones/*"
          element={<GestionPublicacionesRouter />}
        />
        <Route path="/mi-perfil/empresa/:id" element={<MiPerfilRouter isEditable={true}/>} />
        <Route path="/perfil/empresa/:id" element={<MiPerfilRouter isEditable={false}/>} />
        <Route path="/mi-perfil/emprendedor/:id" element={<PerfilEmprendedor isEditable={true}/>} />
        <Route path="/perfil/emprendedor/:id" element={<PerfilEmprendedor isEditable={false}/>} />
        <Route path="/mi-perfil/normalUser/:id" element={<PerfilEmprendedor isEditable={true}/>} />
        <Route path="/publicacion/:id" element={<VerPublicacionRouter />} />
        <Route path="/mensajes/:id" element={<MensajesRouter />} />
        <Route path="/solicitudes" element={<SolicitudesRouter/>}/>
      </Routes>
    </div>
  );
}

export default AppRoutes;
