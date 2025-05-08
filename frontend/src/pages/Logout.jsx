import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Call logout to clear user data
    logout();
    navigate("/login"); // Redirect to login after logout
  }, [logout, navigate]);

  return null; // Nothing to render
};

export default Logout;
