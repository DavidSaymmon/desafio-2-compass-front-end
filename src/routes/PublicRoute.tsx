import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}
