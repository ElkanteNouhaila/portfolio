import { useCallback, useEffect, useState } from "react";
import { apiFetch, clearToken, getToken, setToken } from "../lib/api";
import type { AuthContextValue, User } from "./authContext";

export function useAuthLogic(): AuthContextValue {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiFetch("/api/auth/me");
      if (!res.ok) {
        clearToken();
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (email: string, password: string) => {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return data.message || "Login failed.";

    setToken(data.token);
    setUser(data.user);
    return null;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}