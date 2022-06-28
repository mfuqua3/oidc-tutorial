import React, {useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {OAuthEndpoints} from "./auth/OAuthEndpoints";
import axios from "axios";

function App() {
    const [clientId, setClientId] = useState("990338725579984968");
    const [state, setState] = useState("");
    const [redirectUri, setRedirectUri] = useState("/signin-discord");
    const [httpResponse, setHttpResponse] = useState("");

    async function tryAuthorize() {
        const response = axios.getUri({
            baseURL: OAuthEndpoints.Authorize,
            params: {
                client_id: clientId,
                response_type: "code",
                redirectUri: (window.location.origin + redirectUri),
                scope: "identify",
                state: state.length ? state : undefined
            }
        });
        console.log(response);
        setHttpResponse(JSON.stringify(response));
    }

    return (
        <Box m={2}>
            <Typography variant={"h4"}>Discord OAUTH2</Typography>
            <Stack direction={"column"}>
                <Typography>
                    Authorize Endpoint: {OAuthEndpoints.Authorize}
                </Typography>
                <Typography>
                    Token Endpoint: {OAuthEndpoints.Token}
                </Typography>
            </Stack>
            <Typography variant={"h5"}>Authorization Fields</Typography>
            <TextField disabled value={clientId} onChange={(e) => setClientId(e.target.value)}
                       label={"Client ID"}/>
            <TextField value={state} onChange={(e) => setState(e.target.value)} label={"State"}/>
            <TextField disabled value={redirectUri} onChange={(e) => setState(e.target.value)}
                       label={"Redirect URI"}/>
            <Button onClick={tryAuthorize}>Try Authorize</Button>
            <Typography variant={"h5"}>Response</Typography>
            {httpResponse}
        </Box>
    );
}

export default App;