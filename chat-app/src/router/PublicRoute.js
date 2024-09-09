import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

// import { Navigate, useLocation } from "react-router-dom";

// export const PublicRoute = ({
//   isAuthenticated,
//   element: Component,
//   ...rest
// }) => {
//   const location = useLocation();

//   return !isAuthenticated ? (
//     <Component {...rest} />
//   ) : (
//     <Navigate to="/" state={{ from: location }} />
//   );
// };

// import { Redirect, Route } from "react-router-dom";

// export const PublicRoute = ({
//   isAuthenticated,
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       component={(props) =>
//         !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };
