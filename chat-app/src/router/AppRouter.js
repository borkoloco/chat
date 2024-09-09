import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { ChatPage } from "../pages/ChatPage";
import { AuthContext } from "../auth/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute isAuthenticated={auth.logged}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={auth.logged}>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// import React, { useContext, useEffect } from "react";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthRouter } from "./AuthRouter";
// import { ChatPage } from "../pages/ChatPage";
// import { AuthContext } from "../auth/AuthContext";
// import { PublicRoute } from "./PublicRoute";
// import { PrivateRoute } from "./PrivateRoute";

// export const AppRouter = () => {
//   const { auth, verificaToken } = useContext(AuthContext);

//   useEffect(() => {
//     verificaToken();
//   }, [verificaToken]);

//   if (auth.checking) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/auth/*" element={<AuthRouter />} /> */}
//         <PublicRoute
//           isAuthenticated={auth.logged}
//           path="/auth/*"
//           element={<AuthRouter />}
//         />
//         <PrivateRoute
//           isAuthenticated={auth.logged}
//           path="/"
//           element={<ChatPage />}
//         />
//         {/* <Route path="/" element={<ChatPage />} /> */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

//OBSOLETO
// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { LoginPage } from "../pages/LoginPage";
// import { RegisterPage } from "../pages/RegisterPage";
// import { ChatPage } from "../pages/ChatPage";

// export const AppRouter = () => {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route path="/login" component={<LoginPage />} />
//           <Route path="/register" component={<RegisterPage />} />
//           <Route path="/" component={<ChatPage />} />
//           <Redirect to="/" />
//         </Switch>
//       </div>
//     </Router>
//   );
// };
