import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../modules/home/home";
import { GestionPropuestasRouter } from "../modules/gestion-propuestas/GestionPropuestasRouter";


function AppRoutes () {
  
    return (
    <div className="AppRoutes">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/gestion-propuestas/*" element={<GestionPropuestasRouter/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default AppRoutes;