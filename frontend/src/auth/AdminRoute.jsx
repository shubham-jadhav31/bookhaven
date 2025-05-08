import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth"; // or import AuthContext if not using useAuth

export const AdminRoute = ({ children }) => {
  const { user } = useAuth(); // user should contain role info

  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) {
    console.log(`UserId: ${user.userId} | User IsAdmin: ${user.is_admin} | Navigating to ///`);
    console.log("User: ", user);
    return <Navigate to="/" replace />;
  }

  return children;
};
