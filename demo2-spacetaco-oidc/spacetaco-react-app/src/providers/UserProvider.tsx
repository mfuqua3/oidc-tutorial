import {createContext, ReactNode, useEffect, useState} from "react";
import {UserSummary} from "../models/UserSummary";
import {IdentityApi} from "../api/IdentityApi";
import useAuth from "../hooks/useAuth";

export interface UserProviderState {
    getUserNameFromId: (id: string) => string | null
    users: UserSummary[]
}

export const UserContext = createContext<UserProviderState | null>(null);

function UserProvider({children}: { children: ReactNode }) {
    const {getUser} = useAuth();
    const [users, setUsers] = useState<UserSummary[]>([]);
    useEffect(()=>{
        getUser().then(()=>{
            IdentityApi.getUsers()
                .then(users=>setUsers(users));
        })
    },[]);
    function getUserNameFromId(id: string): string | null{
        return users.find(x=>x.userId === id)?.username ?? null;
    }
    const state: UserProviderState = {
        users,
        getUserNameFromId
    }
    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;