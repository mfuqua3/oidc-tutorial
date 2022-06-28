import React from "react";
import {AuthConsumer} from "../providers/AuthProvider";

function SilentRenew() {
    return (<AuthConsumer>
        {({ signinSilentCallback }) => {
            signinSilentCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>)
};

export default SilentRenew;