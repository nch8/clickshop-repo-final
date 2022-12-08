import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRouteClient = ({
  redirectTo = "/home",
  children,
}) => {
  const rol = sessionStorage.getItem('rol')
  if (rol=='ROL_CLIENTE' || rol=='ROL_VENDEDOR') {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectTo} replace />;

};

export const ProtectedRouteVendeor = ({
  isAllowed,
  redirectTo = "/home",
  children,
}) => {
  const rol = sessionStorage.getItem('rol')
  if (rol!='ROL_VENDEDOR') {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export const ProtectedRouteAdmin = ({
  isAllowed,
  redirectTo = "/userlist",
  children,
}) => {
  const rol = sessionStorage.getItem('rol')
  if (rol!='ROL_ADMIN') {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};