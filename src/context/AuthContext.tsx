import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../utils/setAuthToken";
import { AuthContextProps, AuthProviderProps, User } from "../interfaces/interface";

const defaultAuthContextProps = {
  token: null,
  setToken: () => {},
  appLogin: () => {},
  appLogout: () => {},
  user: null,
  setUser: () => {},
}

const AuthContext = createContext<AuthContextProps>(defaultAuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const [user, setUser] = useState<User | null>(((localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")!) : {}) || null);

  const appLogin = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setAuthToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const appLogout = () => {
    setUser({});
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, appLogin, appLogout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);