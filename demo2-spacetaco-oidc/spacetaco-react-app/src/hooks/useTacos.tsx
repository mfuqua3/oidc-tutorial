import {useContext} from "react";
import {TacoContext, TacoProviderState} from "../providers/TacosProvider";

export default function (): TacoProviderState {
    const state = useContext(TacoContext);
    if (!state) {
        throw new Error("null state")
    }
    ;
    return state;
}