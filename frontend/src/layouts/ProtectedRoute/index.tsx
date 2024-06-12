import { getToken, isTokenValid } from "@/utils/auth";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getToken();
    if (accessToken && isTokenValid(accessToken)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user_info");
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []);

  return <>{isAuthenticated ? <>{children}</> : <></>}</>;
}

export default ProtectedRoute;
