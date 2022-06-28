import React, {useEffect, useState} from "react";
import useAuth from "../hooks/useAuth";
import {UserSummary} from "../models/UserSummary";
import {Taco} from "../models/Taco";
import {User} from "oidc-client";
import {SpaceTacosApi} from "../api/SpaceTacosApi";
import {IdentityApi} from "../api/IdentityApi";
import {Stack} from "@mui/material";
import Loading from "./Loading";
import GiveTaco from "./GiveTaco";
import PrintTacos from "./PrintTacos";
import useUsers from "../hooks/useUsers";

type DashboardState = "Loading" | "Error" | "Ready";

function Dashboard() {
    const {users} = useUsers();
    const [allocation, setAllocation] = useState<number | undefined>(-1);
    const [candidates, setCandidates] = useState<UserSummary[] | undefined>(undefined)
    const [pageState, setPageState] = useState<DashboardState>("Loading");
    const {getUser} = useAuth();
    const [user, setUser] = useState<User | undefined>()
    const [pastTacos, setPastTacos] = useState<Taco[] | undefined>(undefined)
    useEffect(()=>{
        setCandidates(users.filter(usr => usr.userId !== user?.profile.sub));
    },[users]);
    useEffect(() => {
        initialize().catch(() => setPageState("Error"));
    }, []);

    async function initialize() {
        const user = await getUser();
        setUser(user);
        const myTacos = await SpaceTacosApi.getMyTacoSummary();
        setAllocation(myTacos.tacosAvailable);
        const allTacos = await SpaceTacosApi.getAllTacos();
        setPastTacos(allTacos);
        setPageState("Ready");
    }

    return (
        <>
            {(pageState === "Ready" && user && allocation && candidates && pastTacos) ?
                <>
                    <Stack direction={"column"} height={"100%"}>
                        <GiveTaco tacoCandidates={candidates} tacoAllocation={allocation}
                                  onAllocationChanged={(val) => setAllocation(prev => (prev ?? 0) - val)} />
                        <PrintTacos />
                    </Stack>
                </> : <Loading/>}
        </>
    )
}

export default React.memo(Dashboard);