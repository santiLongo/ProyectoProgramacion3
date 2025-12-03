import { Routes, Route } from "react-router-dom";
import { VerPropuesta } from "../view/VerPropuesta";

export function VerPropuestaRoutes() {
  return (
    <div className="VerPropuestaRoutesRouter">
      <Routes>
        <Route path="/" element={<VerPropuesta />} />
      </Routes>
    </div>
  );
}