import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../modules/home/home";


function AppRoutes () {
  
    return (
    <div className="AppRoutes">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default AppRoutes;