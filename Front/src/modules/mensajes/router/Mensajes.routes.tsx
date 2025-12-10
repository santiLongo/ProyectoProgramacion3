import { Route, Routes } from "react-router-dom";
import { Mensajes } from "../view/Mensajes";

export function MensajesRoutes() {
    return (
        <div className="MensajesRouter">
      <Routes>
        <Route path="/" element={<Mensajes />} />
      </Routes>
    </div>
    );
};
