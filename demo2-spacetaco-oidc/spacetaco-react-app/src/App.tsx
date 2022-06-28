import React, {useContext} from 'react';
import {AuthContext} from "./providers/AuthProvider";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Callback from "./components/Callback";
import {Login} from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AppContainer from "./components/AppContainer";
import UserProvider from "./providers/UserProvider";
import TacoProvider from "./providers/TacosProvider";

function App() {
    const auth = useContext(AuthContext);
    return (
        <Routes>
            <Route element={<AppContainer/>}>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route element={<PrivateRoute/>}>
                    <Route element={<UserProvider><Outlet/></UserProvider>}>
                        <Route element={<TacoProvider><Outlet/></TacoProvider>}>
                        <Route path={"/en/dashboard"} element={<Dashboard/>}/>
                        </Route>
                    </Route>
                </Route>
                <Route path={"/signin-oidc"} element={<Callback/>}/>
                <Route path={"*"} element={<Navigate to={"/en/dashboard"}/>}/>
            </Route>
        </Routes>
    );
}

export default App;
