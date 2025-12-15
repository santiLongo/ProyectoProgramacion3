import { Route, Routes } from "react-router-dom";
import { Solicitudes } from "../view/Solicitudes";

export function SolicitudesRoutes() {
  return (
    <>
      <div className="SolicitudesRoutes">
        <Routes>
            <Route path="/" element={<Solicitudes/>}/>
        </Routes>
      </div>
    </>
  );
}
