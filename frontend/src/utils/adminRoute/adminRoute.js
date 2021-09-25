import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.authenticated() && AuthService.isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default AdminRoute;
