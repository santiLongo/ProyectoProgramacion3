import { Route, Routes } from "react-router-dom";
import Home from "../view/Home";


export function HomeRoutes() {
  return (
    <div className="HomeRouter">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
