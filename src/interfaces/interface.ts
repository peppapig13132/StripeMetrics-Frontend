import { ReactNode } from "react";

export interface User {
  id?: number;
  email?: string;
}

export interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  appLogin: (user: User, token: string) => void;
  appLogout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}