import { createContext } from "react";

type User = { id: string; email: string };

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);    