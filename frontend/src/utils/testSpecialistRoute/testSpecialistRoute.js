import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/authentication/auth.service";

const TestSpecialistRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.authenticated() && AuthService.isTestSpecialist() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default TestSpecialistRoute;
