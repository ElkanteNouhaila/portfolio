import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import { useAuthLogic } from "./useAuthLogic";

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthLogic();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}