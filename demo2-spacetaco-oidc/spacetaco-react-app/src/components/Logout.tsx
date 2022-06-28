import React from "react";
import {AuthConsumer} from "../providers/AuthProvider";

function Logout() {
    return (<AuthConsumer>
        {({logout}) => {
            logout();
            return <span>loading</span>;
        }}
    </AuthConsumer>)
};

export default Logout;