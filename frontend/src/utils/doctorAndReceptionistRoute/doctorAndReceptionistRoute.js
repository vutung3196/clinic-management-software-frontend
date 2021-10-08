import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";

const doctorAndReceptionistRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.authenticated() &&
      (AuthService.isDoctor() || AuthService.isReceptionist()) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default doctorAndReceptionistRoute;
