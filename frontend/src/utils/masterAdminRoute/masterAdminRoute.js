import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";

const MasterAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.authenticated() === true &&
      AuthService.isMasterAdmin() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default MasterAdminRoute;
