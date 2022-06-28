import {createContext, ReactNode, useEffect, useState} from "react";
import {UserSummary} from "../models/UserSummary";
import {IdentityApi} from "../api/IdentityApi";
import useAuth from "../hooks/useAuth";
import {Taco} from "../models/Taco";
import {SpaceTacosApi} from "../api/SpaceTacosApi";

export interface TacoProviderState {
    refresh(): Promise<void>
    tacos: Taco[] | undefined;
}

export const TacoContext = createContext<TacoProviderState | null>(null);

function TacoProvider({children}: { children: ReactNode }) {
    const {getUser} = useAuth();
    const [tacos, setTacos] = useState<Taco[] | undefined>(undefined);
    useEffect(()=>{
        getUser()
            .then(getTacos);
    },[]);
    async function getTacos(): Promise<void>{
        const tacoResult = await SpaceTacosApi.getAllTacos();
        setTacos(tacoResult);
    }
    const state: TacoProviderState = {
        tacos,
        refresh: getTacos
    }
    return (
        <TacoContext.Provider value={state}>
            {children}
        </TacoContext.Provider>
    )
}

export default TacoProvider;