import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import {AuthContext} from "./providers/AuthProvider";
import {Button} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Callback from "./components/Callback";

function App() {
  const auth = useContext(AuthContext);
  return (
      <Routes>
        <Route path={"/"} element={
          <>
            <Button onClick={()=> auth.signInRedirect()}>Sign In</Button>
          </>
        }></Route>
        <Route path={"/signin-oidc"} element={<Callback/>}/>
      </Routes>
  );
}

export default App;
