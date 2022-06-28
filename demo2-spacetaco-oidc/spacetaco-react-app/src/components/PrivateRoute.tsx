import React, {ReactNode} from "react";
import {Navigate, Outlet, Route, RouteProps, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute() {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    return (
        isAuthenticated() ? <Outlet/> : <Navigate to={"/login"} state={{from: location}}/>
    )
}

export default PrivateRoute;