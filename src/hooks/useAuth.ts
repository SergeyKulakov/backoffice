import { useContext } from "react";
import { AuthContext } from "../contexts/auth/amplify-context";
import type { AuthContextType as AmplifyAuthContextType } from "../contexts/auth/amplify-context";

type AuthContextType = AmplifyAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
