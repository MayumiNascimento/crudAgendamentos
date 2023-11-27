import React from "react";
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from "./appRoutes";

const Router: React.FC = () => (

    <BrowserRouter>
       <AppRoutes />
    </BrowserRouter>
)

export default Router;