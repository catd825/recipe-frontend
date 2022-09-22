import { createContext } from "react";
import { IUser } from "./interfaces";

interface AuthContextInterface {
    token: string | null;
    user: boolean | IUser
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
