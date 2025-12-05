import { Route, Routes } from "react-router-dom";
import { VerPublicacion } from "../view/VerPublicacion";

export const VerPublicacionRoutes: React.FC = () => {
  return (
    <div className="VerPublicacionRouter">
      <Routes>
        <Route path="/" element={<VerPublicacion />} />
      </Routes>
    </div>
  );
};
