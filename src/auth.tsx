import * as React from "react";
import axios from "./api/apiClient";

import { apiBaseUrl } from "./constants";
import { AxiosResponse } from "axios";

interface UserItems {
  id: string;
  name: string;
  email: string;
  profileImg: string;
}

interface SavedUser extends UserItems {
  token: string;
}

interface LoginType {
  user: UserItems;
  token: string;
  err: boolean;
  msg: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AxiosResponse<LoginType>>;
  logout: () => Promise<void>;
  user: UserItems | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "tanstack.auth.user";

function getStoredUser(): SavedUser | null {
  const stored = localStorage.getItem(key);
  return stored ? (JSON.parse(stored) as SavedUser) : null;
}

function setStoredUser(user: SavedUser | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<SavedUser | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const res = await axios.post<LoginType, AxiosResponse>(
      apiBaseUrl + "/user/login",
      {
        email,
        password,
      }
    );
    if (res.status === 200 && !res.data.err) {
      const token = res.data.token;
      setStoredUser({ ...res.data.user, token });
      setUser({ ...res.data.user, token });
    }
    return res;
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
