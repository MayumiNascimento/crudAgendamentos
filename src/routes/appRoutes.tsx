import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Agendamentos from "../Pages/agendamentos";


const AppRoutes: React.FunctionComponent = () => {

    return(
        <Routes>
            <Route path="/" element={<Agendamentos />}/>
        </Routes>
    )
}
export default AppRoutes;