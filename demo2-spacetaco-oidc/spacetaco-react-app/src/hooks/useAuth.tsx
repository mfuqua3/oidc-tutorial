import {IAuthService} from "../auth/AuthService";
import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

export default function (): IAuthService {
    return useContext(AuthContext);
}