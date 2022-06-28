import React from "react";
import {AuthConsumer} from "../providers/AuthProvider";

function Callback() {
    return (<AuthConsumer>
        {({signinRedirectCallback}) => {
            signinRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>)
};

export default Callback;