import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} />
  );
};

// import { Navigate, useLocation } from "react-router-dom";

// export const PrivateRoute = ({
//   isAuthenticated,
//   element: Component,
//   ...rest
// }) => {
//   const location = useLocation();

//   return isAuthenticated ? (
//     <Component {...rest} />
//   ) : (
//     <Navigate to="/auth" state={{ from: location }} />
//   );
// };
