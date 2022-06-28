import {useContext} from "react";
import {UserContext, UserProviderState} from "../providers/UserProvider";

export default function ():UserProviderState{
    const state= useContext(UserContext);
    if(!state){
        throw new Error("null state")
    };
    return state;
}