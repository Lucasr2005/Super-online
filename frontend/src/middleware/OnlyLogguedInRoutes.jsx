import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export function OnlyLogguedInRoutes() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.isLogged && user.isValidated) {
      const from = location.pathname + location.search;
      navigate(`/login?redirect=${from}`);
    }
  }, [user, location, navigate]);

  if (!user.isValidated) {
    return null;
  }
  return <Outlet />;
}
