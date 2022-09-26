import { createContext } from "react";
import { IUser } from "./interfaces";

interface AuthContextInterface {
    token: string | null;
    // will fix later
    user: any;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);
