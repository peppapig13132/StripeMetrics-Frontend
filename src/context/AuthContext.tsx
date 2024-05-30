import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../utils/setAuthToken";
import { AuthContextProps, AuthProviderProps, User } from "../interfaces/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { isVaildToken } from "../utils/utils";

const protectedPaths: string[] = [
  '/dashboard',
];

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
  const location = useLocation()
  const navigate = useNavigate();

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

  useEffect(() => {
    const currLocation = location.pathname;
    const isProtectedPath = protectedPaths.includes(currLocation);

    if(!token && isProtectedPath && (currLocation !== '/login')) {
      if(!isVaildToken(token !== null ? token : '')){
        navigate('/login');
      }
    }
  }, [navigate, token, location.pathname]);

  return (
    <AuthContext.Provider value={{ token, setToken, appLogin, appLogout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);