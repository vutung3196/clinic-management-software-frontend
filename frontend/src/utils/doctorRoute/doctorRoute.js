import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";

const DoctorRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.authenticated() && AuthService.isDoctor() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default DoctorRoute;
