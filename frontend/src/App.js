import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";
import Main from "./containers/pages/Main";
import Login from "./containers/pages/Login";
import ClinicManagementPage from "./containers/pages/ClinicManagement";
import UserManagementPage from "./containers/pages/UserManagement";
import InformationManagementPage from "./containers/pages/InformationManagement";
import PatientsPage from "./containers/pages/Patients";
import SingleReceiptPage from "./containers/pages/SingleReceipt";
import SingleDoctorVisitingFormPage from "./containers/pages/SingleDoctorVisitingForm";
import DoctorVisitingFormsPage from "./containers/pages/DoctorVisitingForms";

import authService from "./services/authentication/auth.service";

import PrivateRoute from "./utils/privateRoute";
import AdminRoute from "./utils/adminRoute";
import MasterAdminRoute from "./utils/masterAdminRoute";
import ReceptionistRoute from "./utils/receptionistRoute";
import DoctorRoute from "./utils/doctorRoute";
import DoctorAndReceptionistRoute from "./utils/doctorAndReceptionistRoute/doctorAndReceptionistRoute";

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
          <AdminRoute
            exact
            path="/usermanagement"
            props
            component={UserManagementPage}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/informationmanagement"
            props
            component={InformationManagementPage}
          ></AdminRoute>
          <MasterAdminRoute
            exact
            path="/clinicmanagement"
            props
            component={ClinicManagementPage}
          ></MasterAdminRoute>
          <ReceptionistRoute
            exact
            path="/patients"
            props
            component={PatientsPage}
          ></ReceptionistRoute>
          <DoctorAndReceptionistRoute
            exact
            path="/doctorvisitingforms"
            props
            component={DoctorVisitingFormsPage}
          ></DoctorAndReceptionistRoute>
          <PrivateRoute
            path="/receipt/:id"
            component={SingleReceiptPage}
          ></PrivateRoute>
          <PrivateRoute
            path="/doctorvisitingform/:id"
            component={SingleDoctorVisitingFormPage}
          ></PrivateRoute>
          <PrivateRoute path="/" component={Main}></PrivateRoute>
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
