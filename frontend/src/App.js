import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";
import Main from "./containers/pages/Main";
import authService from "./services/authentication/auth.service";
import PrivateRoute from "./utils/privateRoute";
import Login from "./containers/pages/Login";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  var isAuthenticated = authService.authenticated();
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            exact
            render={(props) =>
              isAuthenticated ? (
                (alert("You can't login if you are logged in!"),
                (<Redirect to="/" />))
              ) : (
                <Login {...props} />
              )
            }
          />
          <PrivateRoute path="/" component={Main}></PrivateRoute>
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
