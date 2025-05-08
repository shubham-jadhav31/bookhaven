import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  console.log("ProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
