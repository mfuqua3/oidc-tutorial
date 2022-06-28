import axios from "axios";
import {UserSummary} from "../models/UserSummary";

const apiRoot = process.env.REACT_APP_AUTHORITY + "/api/"
export const IdentityApi = {
    getUsers: async ():Promise<UserSummary[]> => {
        const response = await axios.get<UserSummary[]>(apiRoot + "users");
        return response.data;
    }
}