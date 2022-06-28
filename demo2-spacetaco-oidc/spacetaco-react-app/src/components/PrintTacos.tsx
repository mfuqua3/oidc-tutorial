import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import useUsers from "../hooks/useUsers";
import Loading from "./Loading";
import useTacos from "../hooks/useTacos";

function PrintTacos() {
    const {getUserNameFromId} = useUsers();
    const {tacos} = useTacos();

    return (
        <Box bgcolor={"darkslateblue"} width={"80vw"} display={"flex"} alignItems={"center"}
             justifyContent={"start"} p={2} flexDirection={"column"} marginTop={2}>
            <Typography variant={"h3"} color={"lightsteelblue"} marginBottom={6}>
                Who's Getting Tacos?
            </Typography>
            {
                tacos ? <>
                    {tacos.map(taco =>
                        <Box bgcolor={"lightgrey"} width={"80%"} p={2} m={1} key={taco.id}>
                            <Stack direction={"row"}>
                                <Typography fontWeight={"bold"}>
                                    &nbsp;{getUserNameFromId(taco.ownerId)}
                                </Typography>
                                <Typography>
                                    &nbsp;got tacos from
                                </Typography>
                                <Typography fontWeight={"bold"}>
                                    &nbsp;{getUserNameFromId(taco.givenById)}!
                                </Typography>
                            </Stack>
                            <Typography fontStyle={"italic"}>
                                {taco.awardedOn.toString()}
                            </Typography>
                        </Box>)}
                </> : <Loading/>
            }
        </Box>
    )
}

export default React.memo(PrintTacos);