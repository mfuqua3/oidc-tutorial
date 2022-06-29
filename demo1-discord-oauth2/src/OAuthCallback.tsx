import React, {useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Box, Button, Stack, Typography} from "@mui/material";
import axios from "axios";
import {OAuthEndpoints} from "./OAuthEndpoints";

function OAuthCallback() {
    const [query] = useSearchParams();
    const code = query.get("code");
    const state = query.get("state");
    const [token, setToken] = useState<string|null>(null);
    const formBody = {
        client_id:"990338725579984968",
        client_secret:"",
        grant_type:"authorization_code",
        code:code,
        redirect_url: (window.location.origin + "/signin-discord")
    };
    async function requestToken(){
        const resp = await axios.postForm(OAuthEndpoints.Token, formBody);
        setToken(JSON.stringify(resp,null,2));
    }
    return (
        <Stack m={2} spacing={2}>
            <Typography>Code returned is: {code}</Typography>
            <Typography>State returned is: {state}</Typography>
            <Typography>Request Token Form Body Is:</Typography>
            <Typography>{JSON.stringify(formBody, null, 2)}</Typography>
            <Button onClick={requestToken}>Request Token?</Button>
            <Typography>Return Value:</Typography>
            <Typography>{token}</Typography>
        </Stack>
    )
}

export default React.memo(OAuthCallback);
