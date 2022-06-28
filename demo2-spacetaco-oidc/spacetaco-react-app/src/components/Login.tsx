import React from "react";
import {Button} from "@mui/material";
import useAuth from "../hooks/useAuth";

export function Login() {
    const {signInRedirect} = useAuth();
 return (
     <>
         <Button onClick={signInRedirect}>Sign In</Button>
     </>
 )
}

export default React.memo(Login);