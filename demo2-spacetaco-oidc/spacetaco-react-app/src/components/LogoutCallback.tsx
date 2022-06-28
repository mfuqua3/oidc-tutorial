import React from "react";
import {AuthConsumer} from "../providers/AuthProvider";

function LogoutCallback() {
    return (<AuthConsumer>
        {({ signoutRedirectCallback }) => {
            signoutRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>)
};

export default LogoutCallback;