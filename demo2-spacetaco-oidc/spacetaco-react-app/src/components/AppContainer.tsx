import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import React from "react";

function AppContainer(){
    return(
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"inherit"}>
                <Outlet />

            </Box>
    )
}

export default React.memo(AppContainer);